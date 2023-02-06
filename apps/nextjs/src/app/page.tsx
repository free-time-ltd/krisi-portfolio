import { prisma } from "@portfolio/db";
import HeroGallery from "~/components/HeroGallery";
import { mapImageToDto, type GalleryImage } from "~/utils/image";
import getSettings from "~/utils/settings";
import Logo from "~/components/Logo";
import Image from "next/image";
import Button from "~/components/Button";

interface FetchImageProps {
  category: string;
  limit?: number;
  offset?: number;
  desc?: boolean;
}

const fetchImages = ({
  category,
  limit = 5,
  offset = 0,
  desc = false,
}: FetchImageProps) =>
  prisma.image.findMany({
    where: {
      ImageCategory: {
        some: {
          Category: { slug: category },
        },
      },
    },
    include: {
      ImageThumbnail: true,
    },
    take: limit > 0 ? limit : undefined,
    skip: offset,
    orderBy: { sortOrder: desc ? "desc" : "asc" },
  });

const tmpGalleryComponent = (images: GalleryImage[]) =>
  images.map((image) => (
    <a
      href="#"
      className="inline-block border-2 border-black bg-[#FFF175] text-left text-black no-underline"
      key={image.src}
    >
      <div className="block h-[185px] w-full">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          className="h-full max-w-full"
          alt={image.name ?? ""}
        />
      </div>
      <div className="block p-4">
        <h4>{image.name}</h4>
        <p>{image.description}</p>
      </div>
    </a>
  ));

const IndexPage = async () => {
  const settings = await getSettings();
  const heroImages = await fetchImages({ category: "slider", limit: 0 });
  const portfolioImages = await fetchImages({
    category: "portfolio",
    limit: 4,
  });
  const sketchImages = await fetchImages({ category: "sketches", limit: 4 });

  const images = heroImages.map((image) => mapImageToDto(image, "16_9_thumb"));
  const portfolio = portfolioImages.map((image) =>
    mapImageToDto(image, "450_thumb")
  );
  const sketches = sketchImages.map((image) =>
    mapImageToDto(image, "450_thumb")
  );

  return (
    <>
      <div className="mt-2 flex justify-center">
        <div className="grid grid-flow-col-dense grid-rows-1 gap-0">
          <Logo white alt={settings.get("logo_name")?.value} />
          <h1 className="ml-2 flex flex-col items-start justify-center text-white">
            <span className="font-c2ym text-5xl font-medium leading-8">
              Kristina
            </span>
            <span className="font-c2ym text-5xl font-medium leading-8">
              Kostova
            </span>
            <span className="text-[0px]">Portfolio</span>
          </h1>
        </div>
      </div>
      <div className="header mt-1 mb-4 text-white">
        {settings.has("site_slogan") && (
          <h2 className="font-c2ym text-center text-3xl font-medium">
            {settings.get("site_slogan")?.value}
          </h2>
        )}
      </div>
      <HeroGallery images={images} />
      <div className="flex items-center justify-between bg-white p-5">
        <div className="w-10">
          <Logo white={false} />
        </div>
        <ul className="flex gap-4 font-medium">
          <li>Home</li>
          <li>Portfolio</li>
          <li>Sketches</li>
          <li>About me</li>
          <li>Contacts</li>
          <li>Testimonials</li>
          <li>Connect</li>
        </ul>
      </div>
      <section className="portfolio-section my-8">
        <h1 className="font-c2ym mb-4 text-center text-5xl font-medium text-white">
          Portfolio
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {tmpGalleryComponent(portfolio)}
        </div>
        <div className="my-4 text-center">
          <Button type="button">View Portfolio</Button>
        </div>
      </section>
      <section className="portfolio-section my-8">
        <h1 className="font-c2ym mb-4 text-center text-5xl font-medium text-white">
          Sketches
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {tmpGalleryComponent(sketches)}
        </div>
        <div className="my-4 text-center">
          <Button type="button">View Sketches</Button>
        </div>
      </section>
      <div className="spacer flex h-[2400px] items-center justify-center">
        <h2 className="text-xl">Big center</h2>
      </div>
    </>
  );
};

export default IndexPage;
