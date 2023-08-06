import Image from "next/image";
import { notFound } from "next/navigation";
import {
  db,
  ImageModel,
  CategoryModel,
  ImageThumbnailModel,
} from "@portfolio/database";
import { findBySlug } from "@portfolio/database/helpers/imageHelper";

interface Props {
  params: { slug: string };
}

type ThumbnailSize =
  | "lq"
  | "2x_thumb"
  | "5x_thumb"
  | "16_9_thumb"
  | "450_thumb"
  | "site_thumb"
  | "720p_thumb";

export const awsBucketUrl =
  `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com` as const;

export const mapImageToDto = (
  model: ImageModel & { thumbnails: ImageThumbnailModel[] },
  size: ThumbnailSize = "16_9_thumb",
) => {
  const thumb = model.thumbnails.find((thumb) => thumb.type === size);

  const filename = thumb?.filename ?? model.filename ?? "";

  const [width, height] = model.dimensions.split("x") || [];

  return {
    id: model.id.toString(),
    src: `${awsBucketUrl}/${filename.toString()}`,
    width: Number(width ?? 0),
    height: Number(height ?? 0),
    name: model.name ?? Math.random().toString(),
    description: model.description ?? undefined,
  };
};

const GalleryPage = async ({ params: { slug } }: Props) => {
  const images = await findBySlug(slug);
  const imageDTOs = images.map((image) => mapImageToDto(image, "site_thumb"));

  if (images.length === 0) {
    notFound();
  }

  return (
    <>
      <div className="m-4 grid grid-cols-4 justify-center gap-3">
        {imageDTOs.map((image) => (
          <div className="flex flex-col border-4 border-black" key={image.src}>
            <div className="h-40 w-full">
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.name ?? ""}
                className="h-full w-full"
              />
            </div>
            <h2 className="text-xl text-white">{image.name}</h2>
          </div>
        ))}
      </div>
      <p className="my-6 text-center text-white">
        Total images found: {imageDTOs.length}
      </p>
    </>
  );
};

export default GalleryPage;

export async function generateStaticParams() {
  const categories: CategoryModel[] = await db.query.category.findMany();

  return categories.map((category) => ({ slug: category.slug }));
}
