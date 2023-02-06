import { prisma } from "@portfolio/db";
import { type Setting } from "@prisma/client";

const settings = new Map<string, Setting>();

const getSettings = async () => {
  if (typeof window !== "undefined") return settings;

  if (settings.size > 0) {
    return settings;
  }

  try {
    const settingsRes = await prisma.setting.findMany({});
    settingsRes.forEach((setting) => settings.set(setting.key, setting));
  } catch (e) {
    console.error(e);
  }

  return settings;
};

export default getSettings;
