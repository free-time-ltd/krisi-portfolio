import type { Readable } from "stream";
import { Context, Handler } from "aws-lambda";
import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { prisma } from "@portfolio/db";
import {
  createUploadStatus,
  UploadState,
} from "@portfolio/db/models/uploadStatus.model";
import { createImage, createThumb } from "@portfolio/db/models/image.model";
import {
  scaleImage,
  resizeImage,
  resizeImageAspect,
  getBuffer,
  getNormalSize,
  buildUrl,
} from "./utils";
import sharp from "sharp";
import { exit } from "process";

const thumbSettings: ThumbnailConfMap = {
  lq: { quality: 70, type: "scale", scale: 1 },
  "2x_thumb": { quality: 70, type: "scale", scale: 0.5 },
  "5x_thumb": { quality: 70, type: "scale", scale: 0.2 },
  "16_9_thumb": { quality: 70, type: "aspect", ratio: "16:9" },
  "450_thumb": { quality: 70, type: "resize", width: 450 },
  site_thumb: { quality: 70, type: "resize", width: 270 },
} as const;

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY ?? "",
    secretAccessKey: process.env.AWS_SECRET_SES ?? "",
  },
});

export const handler: Handler = async (event, context: Context) => {
  const Key = event.Records[0].s3.object.key;

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_UPLOAD_BUCKET ?? "",
    Key,
  });

  const response = await s3Client.send(command);
  const { filename } = response.Metadata as FileMetadata;

  // Initialize Upload State
  try {
    await createUploadStatus(filename, UploadState.NEW);
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Uknown prisma error";
    await prisma.uploadStatus.update({
      where: {
        hash: filename,
      },
      data: {
        status: UploadState.ERROR,
        log: errMsg,
      },
    });

    console.error(errMsg);

    exit(1);
  }

  try {
    const thumbs = await createImageAtS3(response);

    await prisma.uploadStatus.update({
      where: {
        hash: filename,
      },
      data: {
        status: UploadState.COMPLETE,
        updatedAt: new Date(),
      },
    });

    // Delete source image
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_UPLOAD_BUCKET,
        Key,
      })
    );

    const awsRes = {
      statusCode: 200,
      filename,
      thumbs,
      message: "ok",
    };

    return awsRes;
  } catch (e) {
    const errMsg = (e as Error).message;

    await prisma.uploadStatus.update({
      where: {
        hash: filename,
      },
      data: {
        status: UploadState.ERROR,
        updatedAt: new Date(),
        log: errMsg ?? "Unknown error",
      },
    });

    throw e;
  }
};

const createImageAtS3 = async (response: GetObjectCommandOutput) => {
  const { Body } = response;
  const Buffer = await getBuffer(Body as Readable);
  const { filename, category, extension, name, descr } =
    response.Metadata as FileMetadata;
  const size = getNormalSize(await sharp(Buffer).metadata());

  const fileKey = buildUrl({ category, filename, extension });

  const cmd = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: fileKey,
    Body: Buffer,
  });

  await s3Client.send(cmd);

  // Copy image to album
  const parentImage = await createImage({
    dimensions: [size.width, size.height].join("x"),
    name,
    filename: fileKey,
    extension,
    description: descr,
    isVisible: false,
    mature: false,
    origin: "s3",
    position: category,
    sortOrder: 0,
    views: 0,
  });

  const promises = [];
  const thumbs: string[] = [];

  // Generate thumbnails
  for (const key in thumbSettings) {
    if (Object.prototype.hasOwnProperty.call(thumbSettings, key)) {
      const opts = thumbSettings[key];
      let NewImageBuffer: Buffer;

      if (!opts) continue;

      if ("scale" in opts) {
        NewImageBuffer = await scaleImage(Buffer, opts.scale, opts.quality);
      } else if ("width" in opts) {
        NewImageBuffer = await resizeImage(
          Buffer,
          Number(opts.width),
          "auto",
          opts.quality
        );
      } else if ("ratio" in opts) {
        NewImageBuffer = await resizeImageAspect(
          Buffer,
          opts.ratio,
          opts.quality
        );
      } else {
        throw new Error(`Invalid thumbnail type`);
      }

      const size = getNormalSize(await sharp(NewImageBuffer).metadata());

      const thumbName = buildUrl({
        category,
        filename,
        extension,
        suffix: key,
      });

      promises.push(
        s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: thumbName,
            Body: NewImageBuffer,
          })
        )
      );

      promises.push(
        createThumb(parentImage, {
          filename: thumbName,
          dimensions: [size.width, size.height].join("x"),
          type: key,
        })
      );

      thumbs.push(thumbName);
    }
  }

  await Promise.all(promises);

  return thumbs;
};
