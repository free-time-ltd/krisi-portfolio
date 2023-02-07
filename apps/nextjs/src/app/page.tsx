import {
  getCategoryImage,
  getImagesByCategorySlug,
  mapImageToDto,
} from "@portfolio/db/models/image.model";
import { getCategoryAll } from "@portfolio/db/models/category.model";
import Logo from "~/components/Logo";
import HeroGallery from "~/components/HeroGallery";
import NavBar from "~/components/NavBar";
import getSettings from "~/utils/settings";
import { pluck } from "~/utils/array";

const IndexPage = async () => {
  const heroImages = await getImagesByCategorySlug("slider");
  const settings = await getSettings();
  const categories = await getCategoryAll();
  const images = heroImages.map((image) => mapImageToDto(image));

  const navBarCategories = categories.filter((category) => category.isHeader);
  const homeCategories = categories.filter((category) => category.isHomepage);

  // const categoryImages = await getCategoryImage(pluck(homeCategories, "id"));

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
      <div className="flex justify-center">
        <ul>
          {homeCategories.map((category) => (
            <li key={category.slug}>{category.name}</li>
          ))}
        </ul>
      </div>
      <div className="spacer flex h-[2400px] items-center justify-center">
        <h2 className="text-xl">Big center</h2>
      </div>
    </>
  );
};

export default IndexPage;
