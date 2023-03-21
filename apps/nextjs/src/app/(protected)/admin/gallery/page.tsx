import { getCategoryAllWithImages } from "@portfolio/db/models/category.model";
import Link from "next/link";
import CardWithImage from "~/components/Admin/CardWithImage";
import { awsBucketUrl, Image, ImageThumbnail } from "@portfolio/db";

const GalleryPage = async () => {
  const categories = await getCategoryAllWithImages();

  const imageToUrl = (
    image: Image & { ImageThumbnail: ImageThumbnail[] }
  ): string => {
    const thumb = image.ImageThumbnail.find(
      (thumb) => thumb.type === "450_thumb"
    );

    return `${awsBucketUrl}/${(thumb ?? image).filename}`;
  };

  return (
    <section className="top-section">
      <h1 className="text-3xl">Gallery Management</h1>
      <ul className="my-4 flex flex-wrap gap-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <CardWithImage
              href={`/admin/gallery/${category.slug}`}
              title={category.name ?? ""}
              subtitle={`${category.name} contains ${category.ImageCategory.length} images`}
              imageSrc={imageToUrl(category.ImageCategory[0].Image)}
            >
              <div className="flex justify-between">
                <Link
                  href={`/admin/gallery/${category.slug}`}
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Manage
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href={`/gallery/${category.slug}`}
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Open in site
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href={`/admin/gallery/${category.slug}`}
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </CardWithImage>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const metadata = {
  title: "Gallery Admin",
};

export default GalleryPage;
