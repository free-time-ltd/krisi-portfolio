import { getCategoryAll } from "@portfolio/db/models/category.model";
import Link from "next/link";

const GalleryPage = async () => {
  const categories = await getCategoryAll();

  return (
    <section className="top-section">
      <h1>Gallery page</h1>
      <ul className="my-4">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/admin/gallery/${category.slug}`}>
              {category.name} - {category.slug}
            </Link>
          </li>
        ))}
      </ul>
      <div className="form">{categories.length}</div>
      <button type="button">Add Gallery</button>
    </section>
  );
};

export const metadata = {
  title: "Gallery Admin",
};

export default GalleryPage;
