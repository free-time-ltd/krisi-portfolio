import getSettings from "~/utils/settings";
import DefaultTags from "./DefaultTags";

const Head = async () => {
  const settings = await getSettings();

  return (
    <>
      <DefaultTags />
      <title>
        {settings.get("site_title")?.value ??
          "Kristina Kostova - Official Homepage, Portfolio, Sketchbook and Illustration"}
      </title>
    </>
  );
};

export default Head;
