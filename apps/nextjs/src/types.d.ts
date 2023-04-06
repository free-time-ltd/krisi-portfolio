import type { Image, ImageThumbnail } from "@portfolio/db";

export type PrismaImage = Image & { ImageThumbnail: ImageThumbnail[] };

export type SidebarLinkEntry = {
  id: string;
  href: string;
  label: string;
  icon: React.ElementType;
};

export type Nullable<T> = T | null;

export interface ImageEntry {
  id: string;
  name: Nullable<string>;
  filename: string;
  dimensions: string;
  sortOrder: number;
  ImageThumbnail: {
    id: string;
    imageId: string;
    filename: string;
    dimensions: string;
    sortOrder: number;
    type: string;
  }[];
}
