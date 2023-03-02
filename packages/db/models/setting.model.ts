import { prisma } from "@portfolio/db";

export const getPublicSettings = () =>
  prisma.setting.findMany({
    where: {
      isPublic: true,
    },
  });

export const getAllSettings = () => prisma.setting.findMany();
