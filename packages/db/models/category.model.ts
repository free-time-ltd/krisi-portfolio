import { prisma } from "@portfolio/db";
import type { Category } from "@portfolio/db";

export const getCategoryAll = () => prisma.category.findMany();

export const getCategoryBySlug = (slug: Category["slug"]) =>
  prisma.category.findFirst({ where: { slug } });
