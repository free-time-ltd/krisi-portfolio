import { getCategoryBySlug, getImagesByCategorySlug } from "@portfolio/db";
import { notFound } from "next/navigation";
import { PrismaImage } from "~/types";
import ImageSorter from "~/components/Admin/ImageSorter";

const serializeImages = (images: PrismaImage[]) =>
  images.map((image) => ({
    ...image,
    id: image.id.toString(),
    ImageThumbnail: image.ImageThumbnail.map((thumb) => ({
      ...thumb,
      imageId: thumb.imageId.toString(),
    })),
  }));

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
        <ImageSorter category={category} images={serializeImages(images)} />
      </div>
    </section>
  );
};

export default GallerySlug;
