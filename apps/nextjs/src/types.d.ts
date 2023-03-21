import type { Image, ImageThumbnail } from "@portfolio/db";

export type PrismaImage = Image & { ImageThumbnail: ImageThumbnail[] };
