import { prisma } from "@portfolio/db";
import ImageSeeder from "./seeders/Image.seeder";
import CategorySeeder from "./seeders/Category.seeder";

async function main() {
  console.warn("Seeding categories...");

  await CategorySeeder();

  console.info("Done.");

  console.warn("Seeding image data");

  await ImageSeeder();

  console.info("Done.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
