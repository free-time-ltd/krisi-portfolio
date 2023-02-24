import type { Readable } from "stream";
import { Context, Handler } from "aws-lambda";
import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandOutput,
} from "@aws-sdk/client-s3";
// import {
//   createUploadStatus,
//   updateStatus,
//   UploadState,
// } from "@portfolio/db/models/uploadStatus.model";
import { scaleImage, resizeImage, resizeImageAspect, getBuffer } from "./utils";

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

  try {
    const response = await s3Client.send(command);

    await createImageAtS3(response);

    const awsRes = {
      statusCode: 200,
      body: `Hello ${event.name || "World"}`,
    };

    return awsRes;
  } catch (e) {
    const error = e instanceof Error ? e.message : "File probably not found";

    return {
      statusCode: 403,
      error,
    };
  }
};

const createImageAtS3 = async (response: GetObjectCommandOutput) => {
  const { Body } = response;
  const Buffer = await getBuffer(Body as Readable);

  for (const key in thumbSettings) {
    if (Object.prototype.hasOwnProperty.call(thumbSettings, key)) {
      const opts = thumbSettings[key];

      if (!opts) continue;

      switch (opts.type) {
        case "scale":
          await scaleImage(
            Buffer,
            opts.scale as ScaleThumbnailConf["scale"],
            opts.quality
          );
          break;
        case "resize":
          await resizeImage(
            Buffer,
            Number(opts.width) as ResizeThumbnailConf["width"],
            "auto",
            opts.quality
          );
          break;
        case "aspect":
          await resizeImageAspect(
            Buffer,
            opts.ratio as AspectThumbnailConf["ratio"],
            opts.quality
          );
          break;
        default:
          throw new Error(`Invalid thumbnail type of: ${opts.type}`);
      }
    }
  }
};
