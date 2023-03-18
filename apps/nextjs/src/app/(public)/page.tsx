import Image from "next/image";
import {
  GalleryImage,
  getCategoryImage,
  getImagesByCategorySlug,
  mapImageToDto,
} from "@portfolio/db/models/image.model";
import { getCategoryAll } from "@portfolio/db/models/category.model";
import Logo from "~/components/Logo";
import HeroGallery from "~/components/HeroGallery";
import NavBar from "~/components/NavBar";
import getSettings from "~/utils/settings";
import type { Category } from "@portfolio/db";
import Button from "~/components/Button";
import Link from "next/link";

const IndexPage = async () => {
  const heroImages = await getImagesByCategorySlug("slider");
  const settings = await getSettings();
  const categories = await getCategoryAll();
  const images = heroImages.map((image) => mapImageToDto(image));

  const navBarCategories = categories.filter((category) => category.isHeader);
  const homeCategories = categories.filter((category) => category.isHomepage);

  const categoryList = await prepareCategoriesForHome(homeCategories);

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
      <NavBar categories={navBarCategories} />
      <section className="my-12 mx-4 flex justify-center">
        <ul className="flex gap-8">
          {categoryList.map((category) => (
            <li
              key={category.id}
              className="card gallery-card shadow-solid-primary w-64 flex-1 transform-gpu border-4 border-black bg-cyan-400 duration-75 ease-in hover:-translate-y-10"
            >
              <Link href={`/gallery/${category.slug}`}>
                <div className="block h-36 w-full overflow-hidden">
                  <Image
                    src={category.image.src}
                    width={category.image.width}
                    height={category.image.height}
                    alt={category.image.name ?? "Category placeholder"}
                    className="h-full w-full"
                  />
                </div>
                <div className="card-title p-4">
                  <h1 className="mb-2 text-3xl uppercase">{category.name}</h1>
                  <p className="break-words">{category.image.description}</p>
                  <p className="break-words">{category.image.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className="my-8 text-center">
        <Link href={"/gallery"}>
          <Button type="button">More art</Button>
        </Link>
      </div>
      <div className="spacer flex h-[2400px] items-center justify-center">
        <h2 className="text-xl">Big center</h2>
      </div>
    </>
  );
};

interface HomeCategory extends Category {
  image: GalleryImage;
}

const prepareCategoriesForHome = async (
  categories: Category[]
): Promise<HomeCategory[]> => {
  if (categories.length === 0) return [];

  const map = categories.map(async (category) => {
    const image = await getCategoryImage(category.id);

    return {
      ...category,
      image: image ? mapImageToDto(image, "site_thumb") : undefined,
    } as HomeCategory;
  });

  return (await Promise.all(map)).filter((val) => val.image);
};

export default IndexPage;
