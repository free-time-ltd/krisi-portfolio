import { Context, Handler } from "aws-lambda";
import { S3 } from "aws-sdk";
import { prisma } from "@portfolio/db";
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

const s3 = new S3({ apiVersion: "2023-02-12", region: process.env.AWS_REGION });

export const handler: Handler = async (event, context: Context) => {
  const defaultSortOrder = await prisma.image.count();

  const Key = event.Records[0].s3.object.key;

  const response = await s3
    .getObject({
      Bucket: process.env.AWS_UPLOAD_BUCKET as string,
      Key,
    })
    .promise();

  if (!response || !response.Metadata || !response.Metadata.filename) {
    console.error(
      "Couldn't find file or missing `filename` entry in the metadata."
    );

    return {
      statusCode: 405,
      error: "Couldn't find file or missing `filename` entry in the metadata",
    };
  }

  const { filename } = response.Metadata;

  const uploadState = await createUploadStatus(filename, UploadState.NEW);

  createImageAtS3(filename, defaultSortOrder);

  updateStatus(uploadState, UploadState.COMPLETE);

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
