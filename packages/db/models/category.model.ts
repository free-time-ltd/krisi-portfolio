import { prisma } from "..";
import type { Category } from "..";

export type { Category } from "..";

export const getCategoryAll = () => prisma.category.findMany();

export const getCategoryBySlug = (slug: Category["slug"]) =>
  prisma.category.findFirst({ where: { slug } });
