import type { Image, ImageThumbnail } from "@portfolio/db";

export type PrismaImage = Image & { ImageThumbnail: ImageThumbnail[] };

export type SidebarLinkEntry = {
  id: string;
  href: string;
  label: string;
  icon: React.ElementType;
};
