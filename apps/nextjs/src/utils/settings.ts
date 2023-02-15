import { getAllSettings } from "@portfolio/db/models/setting.model";
import type { Setting } from "@portfolio/db";

const settings = new Map<string, Setting>();

const getSettings = async (): Promise<typeof settings> => {
  if (typeof window !== "undefined" || settings.size > 0) {
    return settings;
  }

  try {
    const allSettings = await getAllSettings();

    allSettings.forEach((setting) => settings.set(setting.key, setting));
  } catch (e) {
    console.error(e);
  }

  return settings;
};

export default getSettings;
