import type { Readable } from "stream";
import sharp from "sharp";

export const scaleImage = async (Body: Buffer, scale: number, quality = 70) => {
  const metadata = getNormalSize(await sharp(Body).metadata());

  return resizeImage(
    Body,
    Number(metadata.width) * scale,
    Number(metadata.height) * scale,
    quality
  );
};

export const resizeImage = (
  Body: Buffer,
  width: number,
  height: number | "auto" = "auto",
  quality = 70
) => {
  return sharp(Body)
    .resize(width, Number.isInteger(height) ? Number(height) : undefined)
    .toBuffer();
};

export const resizeImageAspect = async (
  Body: Buffer,
  ratioStr: string,
  quality = 70
) => {
  const image = sharp(Body);
  const size = getNormalSize(await image.metadata());
  const neededRatio = ratioStr.split(":").map(Number);
  const { width } = size;

  if (!width) {
    throw new Error("Cannot find width");
  }

  const ratio = Math.round(width / (neededRatio[0] ?? 16));
  const newHeight = Math.round(ratio * (neededRatio[1] ?? 9));

  return image
    .resize(width, newHeight, {
      fit: "contain",
    })
    .toBuffer();
};

interface SizeProps {
  width?: number;
  height?: number;
  orientation?: number;
}

export const getNormalSize = ({ width, height, orientation }: SizeProps) => {
  return (orientation || 0) >= 5
    ? { width: height, height: width }
    : { width, height };
};

export const getBuffer = (stream: Readable) =>
  new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on("data", (chunk) => chunks.push(chunk));
    stream.once("end", () => resolve(Buffer.concat(chunks)));
    stream.once("error", reject);
  });

export const buildUrl = ({
  filename,
  category,
  extension,
  suffix,
  suffixGlue = "_",
}: BuildUrlProps) => {
  const url = ["uploads/"];

  url.push(`${category}/`);
  url.push(`${filename}`);

  if (suffix) {
    url.push(suffixGlue + suffix);
  }

  url.push(`.${extension}`);

  return url.join("");
};
