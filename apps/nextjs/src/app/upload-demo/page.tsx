import { getCategoryAll } from "@portfolio/db/models/category.model";
import Form from "./components/Form";
import { generateFilename } from "@portfolio/utils";

const UploadDemo = async () => {
  const categories = await getCategoryAll();

  return (
    <section className="my-8 flex justify-center">
      <div className="form">
        <p>UUID: {generateFilename()}</p>
        <Form
          categories={categories.map((category) => ({
            id: category.id,
            name: category.name ?? "",
            slug: category.slug,
          }))}
        />
      </div>
    </section>
  );
};

export default UploadDemo;
