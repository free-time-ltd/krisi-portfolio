import { Context, Handler } from "aws-lambda";
import { prisma } from "@portfolio/db";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {
  createUploadStatus,
  updateStatus,
  UploadState,
} from "@portfolio/db/models/uploadStatus.model";

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
  // const defaultSortOrder = await prisma.image.count();

  const Key = event.Records[0].s3.object.key;

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_UPLOAD_BUCKET ?? "",
    Key,
  });

  const response = await s3Client.send(command);

  console.log({ response });

  /*const uploadState = await createUploadStatus(filename, UploadState.NEW);

  createImageAtS3(filename, defaultSortOrder);

  updateStatus(uploadState, UploadState.COMPLETE);*/

  const awsRes = {
    statusCode: 200,
    body: `Hello ${event.name || "World"}`,
  };

  return awsRes;
};

const createImageAtS3 = async (arg: unknown, sortOrder: number) => {
  console.log({ sortOrder });
  return arg;
};
