import { getCategoryBySlug, getImagesByCategorySlug } from "@portfolio/db";
import { notFound } from "next/navigation";
import { ImageEntry, PrismaImage } from "~/types";
import ImageSorter from "~/components/Admin/ImageSorter";

const serializeImages = (images: PrismaImage[]): ImageEntry[] =>
  images.map(
    ({ id, name, filename, dimensions, sortOrder, ImageThumbnail }) => ({
      id: id.toString(),
      name,
      filename,
      dimensions,
      sortOrder,
      ImageThumbnail: ImageThumbnail.map(
        ({ id, imageId, filename, dimensions, sortOrder, type }) => ({
          id: id.toString(),
          imageId: imageId.toString(),
          filename,
          dimensions,
          sortOrder,
          type,
        })
      ),
    })
  );

const GallerySlug = async ({ params }: { params: { slug: string } }) => {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const images = await getImagesByCategorySlug(params.slug);

  return (
    <section className="top-section">
      <h1 className="text-3xl">
        {category.name} Gallery Management{" "}
        {images.length && <>({images.length})</>}
      </h1>
      <div className="my-4">
        <ImageSorter
          category={{ id: category.id.toString(), name: category.name }}
          images={serializeImages(images)}
        />
      </div>
    </section>
  );
};

export default GallerySlug;
