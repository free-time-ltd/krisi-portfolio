import { prisma } from "../../src/server/db";
import ImageCategoryData from "../../data/image_categories.json";

export default async function CategorySeeder() {
  const categories = ImageCategoryData.map(
    ({ id, name, slug, ...category }) => ({
      id,
      name,
      slug,
      createdAt: new Date(category.created_at.replace(/-/g, "/")),
      updatedAt: new Date(category.updated_at.replace(/-/g, "/")),
    })
  );

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        id: category.id,
      },
      create: category,
      update: category,
    });
  }
}
