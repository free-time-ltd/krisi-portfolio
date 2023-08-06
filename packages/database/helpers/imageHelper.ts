import {
  category,
  db,
  eq,
  inArray,
  asc,
  image,
  imageCategory,
  ImageModel,
  imageThumbnail,
  ImageThumbnailModel,
} from "@portfolio/database";

type ImageWithThumb = ImageModel & { thumbnails: ImageThumbnailModel[] };

export const findBySlug = async (slug: string) => {
  const images = await db
    .select({ image })
    .from(image)
    .innerJoin(imageCategory, eq(imageCategory.imageId, image.id))
    .innerJoin(category, eq(imageCategory.categoryId, category.id))
    .where(eq(category.slug, slug))
    .orderBy(asc(image.sortOrder))
    .execute();

  const results = new Map<number, ImageWithThumb>();

  images.forEach(({ image }) =>
    results.set(image.id, { ...image, thumbnails: [] })
  );

  // Eager load thumbnails
  if (results.size > 0) {
    const imageIds = Array.from(results.keys());
    const thumbnails = await db.query.imageThumbnail
      .findMany({
        where: inArray(imageThumbnail.imageId, imageIds),
        orderBy: asc(imageThumbnail.sortOrder),
      })
      .execute();

    thumbnails.forEach((thumb) => {
      const image = results.get(thumb.imageId);
      if (image) {
        image.thumbnails.push(thumb);
      }
    });
  }

  return Array.from(results.values());
};
