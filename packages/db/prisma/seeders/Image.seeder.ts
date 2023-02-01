import { prisma } from "@portfolio/db";
import ImageData from "@portfolio/data/images.json";
import ImageThumbnailData from "@portfolio/data/image_thumbnails.json";
import ImageTagData from "@portfolio/data/image_tags.json";
import type { Image } from "@prisma/client";

export default async function ImageSeeder() {
  const images = ImageData.map(
    ({
      id,
      name,
      description,
      mature,
      position,
      origin,
      dimensions,
      filename,
      extension,
      views,
      ...image
    }): Image => ({
      id: BigInt(id),
      userId: null,
      name,
      description,
      mature: Boolean(mature),
      isVisible: Boolean(image.is_visible),
      position,
      origin,
      dimensions,
      filename,
      extension,
      sortOrder: image.sort_order,
      views,
      hasPinterest: Boolean(image.has_pinterest),
      createdAt: new Date(image.created_at.replace(/-/g, "/")),
      updatedAt: new Date(image.updated_at.replace(/-/g, "/")),
      ImageCategory: {
        create: {
          categoryId: image.category_id,
        },
      },
      ImageThumbnail: {
        create: ImageThumbnailData.filter(
          (thumb) => BigInt(thumb.image_id) === BigInt(id)
        ).map(({ filepath, dimensions, type, ...thumb }) => ({
          filepath,
          dimensions,
          sortOrder: thumb.sort_order,
          type,
          createdAt: new Date(thumb.created_at.replace(/-/g, "/")),
          updatedAt: new Date(thumb.updated_at.replace(/-/g, "/")),
        })),
      },
      ImageTag: {
        create: ImageTagData.filter(
          (tag) => BigInt(tag.image_id) === BigInt(id)
        ).map(({ tag }) => ({
          tag,
        })),
      },
    })
  )
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((image, index) => ({
      ...image,
      sortOrder: index,
    }));

  await prisma.$queryRaw`TRUNCATE TABLE ImageThumbnail`;
  await prisma.$queryRaw`TRUNCATE TABLE ImageTag`;
  await prisma.$queryRaw`TRUNCATE TABLE Image`;

  for (const image of images) {
    await prisma.image.upsert({
      where: {
        id: image.id,
      },
      create: image,
      update: image,
    });
  }
}
