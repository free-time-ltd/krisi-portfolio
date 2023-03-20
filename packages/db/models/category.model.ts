import { prisma } from "@portfolio/db";
import type { Category } from "@portfolio/db";

export const getCategoryAll = () => prisma.category.findMany();

export const getCategoryAllWithImages = () =>
  prisma.category.findMany({
    include: {
      ImageCategory: {
        include: { Image: { include: { ImageThumbnail: true } } },
      },
    },
  });

export const getCategoryBySlug = (slug: Category["slug"]) =>
  prisma.category.findFirst({ where: { slug } });
