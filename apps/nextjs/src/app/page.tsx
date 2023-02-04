import type { GalleryImage } from "~/components/HeroGallery";
import HeroGallery from "~/components/HeroGallery";
import { prisma } from "@portfolio/db";
import { pluck } from "~/utils/array";
import { mapImageToDto } from "~/utils/image";

const fetchData = async () => {
  const images = await prisma.image.findMany({
    where: {
      ImageCategory: {
        some: {
          Category: { slug: "slider" },
        },
      },
    },
    include: {
      ImageThumbnail: true,
    },
    orderBy: { sortOrder: "asc" },
  });

  return images;
};

const IndexPage = async () => {
  const heroImages = await fetchData();

  const images = heroImages.map((image) => mapImageToDto(image, "16_9_thumb"));

  return (
    <>
      <HeroGallery images={images} />
      <h1 className="text-center text-2xl">Kristina Kostova</h1>
      <div className="spacer flex h-[2400px] items-center justify-center">
        <h2 className="text-xl">Big center</h2>
      </div>
    </>
  );
};

export default IndexPage;
