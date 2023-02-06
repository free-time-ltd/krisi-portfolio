import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@portfolio/db";
import { mapImageToDto } from "~/utils/image";

interface Props {
  params: { slug: string };
}

const fetchImages = (slug: string) =>
  prisma.image.findMany({
    where: {
      ImageCategory: {
        some: {
          Category: { slug },
        },
      },
    },
    include: {
      ImageThumbnail: true,
    },
    orderBy: { sortOrder: "asc" },
  });

const GalleryPage = async ({ params: { slug } }: Props) => {
  const images = await fetchImages(slug);
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
  const categories = await prisma.category.findMany();

  return categories.map((category) => ({ slug: category.slug }));
}
