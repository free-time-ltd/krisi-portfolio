import { prisma } from "@portfolio/db";
import SettingData from "@portfolio/data/settings.json";

export default async function SettingSeeder() {
  const settings = SettingData.map(({ key, type, value }) => ({
    key,
    type,
    value,
  }));

  await prisma.$queryRaw`TRUNCATE TABLE Setting`;

  for (const setting of settings) {
    await prisma.setting.create({
      data: { ...setting },
    });
  }
}
