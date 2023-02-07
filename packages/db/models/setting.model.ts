import { prisma } from "..";

export type { Setting } from "@prisma/client";

export const getPublicSettings = () =>
  prisma.setting.findMany({
    where: {
      isPublic: true,
    },
  });

export const getAllSettings = () => prisma.setting.findMany();
