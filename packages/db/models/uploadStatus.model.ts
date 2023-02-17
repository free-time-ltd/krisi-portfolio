import { prisma, type UploadStatus } from "..";

export type { UploadStatus } from "..";

export const UploadState = {
  NEW: "new",
  COMPLETE: "complete",
  ERROR: "error",
} as const;

type UploadStateType = (typeof UploadState)[keyof typeof UploadState];

export const findHash = (hash: string) =>
  prisma.uploadStatus.findUniqueOrThrow({ where: { hash } });

export const createUploadStatus = (
  filename: string,
  state: UploadStateType = "new"
) =>
  prisma.uploadStatus.create({
    data: {
      hash: filename,
      status: state,
    },
  });

export const updateStatus = (
  image: UploadStatus,
  newState: UploadStateType,
  log?: string
) => {
  return prisma.uploadStatus.update({
    where: {
      id: image.id,
    },
    data: {
      status: newState,
      log,
    },
  });
};
