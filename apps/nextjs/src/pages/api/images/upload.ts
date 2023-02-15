import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiResponse, NextApiRequest } from "next";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY ?? "",
    secretAccessKey: process.env.AWS_SECRET ?? "",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Invalid request method" });
  }

  await sleep(1500);

  const { body } = req;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET ?? "tmp-uploads",
    Key: encodeURIComponent(
      `test-object-${Math.ceil(Math.random() * 10 ** 10)}`
    ),
    ContentType: body.mime,
    Metadata: {
      id: "dfjslfksjfsd",
      name: body.name,
      descr: body.description,
    },
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return res.status(200).json({
    success: true,
    data: {
      url,
      contentType: body.mime,
      expiresAt: Math.round(Date.now() / 1000) + 3600,
      bucket: process.env.AWS_BUCKET,
    },
  });
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
