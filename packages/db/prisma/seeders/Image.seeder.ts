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
