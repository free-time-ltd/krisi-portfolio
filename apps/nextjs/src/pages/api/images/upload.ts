import { NextApiResponse, NextApiRequest } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generateFilename } from "@portfolio/utils";

const EXPIRE_PERIOD_SECONDS = 3600;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Invalid request method" });
  }

  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: (process.env.AWS_KEY ?? "").trim(),
      secretAccessKey: (process.env.AWS_SECRET_SES ?? "").trim(),
    },
  });

  const { body } = req;

  const filename = generateFilename();
  const extension = mimeToExtension(body.mime) ?? "";
  const rng = Math.ceil(Math.random() * 10 ** 10);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_UPLOAD_BUCKET ?? "tmp-uploads",
    Key: `${filename}-${rng}.${extension}`,
    ContentType: body.mime,
    Metadata: {
      filename,
      extension,
      name: body.name,
      descr: body.description,
      category: body.category,
    },
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: EXPIRE_PERIOD_SECONDS,
  });

  return res.status(200).json({
    success: true,
    data: {
      url,
      hash: filename,
      contentType: body.mime,
    },
  });
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const mimeToExtension = (mime: string) => {
  switch (mime) {
    case "image/jpeg":
      return "jpeg";
    case "image/png":
      return "png";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    case "image/tiff":
      return "tiff";
    default:
      return mime.split("/").pop();
  }
};
