import { prisma, Prisma } from "@portfolio/db";
import type { Image, Category, ImageThumbnail } from "@portfolio/db";

export type { Image } from "@portfolio/db";

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

export const getImageById = (id: Image["id"]) =>
  prisma.image.findUnique({ where: { id } });

export const getImagesByCategorySlug = (
  slug: Category["slug"],
  limit?: number
) =>
  prisma.image.findMany({
    where: {
      ImageCategory: {
        some: {
          Category: { slug },
        },
      },
    },
    include: {
      ImageThumbnail: true,
    },
    take: limit,
    orderBy: {
      sortOrder: "asc",
    },
  });

export const getCategoryImage = (id: Category["id"]) => {
  return prisma.image.findFirst({
    where: {
      ImageCategory: {
        some: {
          categoryId: id,
        },
      },
    },
    include: {
      ImageThumbnail: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
};

export const createImage = (props: Prisma.ImageCreateInput) => {
  return prisma.image.create({
    data: { ...props },
  });
};

export const createThumb = (
  Image: Image,
  thumb: Omit<Prisma.ImageThumbnailCreateInput, "Image">
) => {
  return prisma.imageThumbnail.create({
    data: {
      ...thumb,
      Image: { connect: { id: Image.id } },
    },
  });
};

export const awsBucketUrl =
  `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com` as const;

export const mapImageToDto = (
  model: Image & { ImageThumbnail: ImageThumbnail[] },
  size: ThumbnailSize = "16_9_thumb"
): GalleryImage => {
  const thumb = model.ImageThumbnail.find((thumb) => thumb.type === size);

  const filename = thumb?.filename ?? model.filename ?? "";

  const [width, height] = model.dimensions.split("x") || [];

  return {
    id: model.id.toString(),
    src: `${awsBucketUrl}/${filename.toString()}`,
    width: Number(width ?? 0),
    height: Number(height ?? 0),
    name: model.name ?? Math.random().toString(),
    description: model.description ?? undefined,
  };
};
