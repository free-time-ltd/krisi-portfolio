import type { Category } from "@prisma/client";
import { prisma } from "..";

export type { Category } from "@prisma/client";

export const getCategoryAll = () => prisma.category.findMany();

export const getCategoryBySlug = (slug: Category["slug"]) =>
  prisma.category.findFirst({ where: { slug } });
