import type { Image, ImageThumbnail } from "@prisma/client";

export interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
  name?: string;
  description?: string;
}

type ThumbnailSize =
  | "lq"
  | "2x_thumb"
  | "5x_thumb"
  | "16_9_thumb"
  | "450_thumb"
  | "site_thumb"
  | "720p_thumb";

// @todo Build this url through AWS_BUCKET & AWS_REGION?
const awsUrl = "https://krisi-gallery.s3.eu-west-2.amazonaws.com";

export const mapImageToDto = (
  model: Image & { ImageThumbnail: ImageThumbnail[] },
  size: ThumbnailSize = "16_9_thumb"
): GalleryImage => {
  const thumb = model.ImageThumbnail.find((thumb) => thumb.type === size);

  const filename = thumb?.filename ?? model.filename ?? "";

  const [width, height] = model.dimensions.split("x") || [];

  return {
    id: model.id.toString(),
    src: `${awsUrl}/${filename.toString()}`,
    width: Number(width ?? 0),
    height: Number(height ?? 0),
    name: model.name ?? Math.random().toString(),
    description: model.description ?? undefined,
  };
};
