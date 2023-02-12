import { Context, Handler } from "aws-lambda";
import { S3 } from "aws-sdk";
import { prisma } from "@portfolio/db";

const s3 = new S3({ apiVersion: "2023-02-12" });

export const handler: Handler = async (event, context: Context) => {
  const totalImages = await prisma.image.count();

  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Running at: ${JSON.stringify(s3.apiVersions.join(", "))}`);
  console.log(`Total images in the database: ${totalImages}`);

  const response = {
    statusCode: 200,
    body: `Hello ${event.name || "World"}`,
  };

  return response;
};
