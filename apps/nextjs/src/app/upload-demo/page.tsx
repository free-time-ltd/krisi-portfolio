"use client";

import TextField from "./components/TextField";

const UploadDemo = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    console.log({ formData });
  };

  return (
    <section className="my-8 flex justify-center">
      <div className="form">
        <form method="post" action="" onSubmit={handleSubmit}>
          <TextField id="name" name="name" label="Name" placeholder="Name" />
          <TextField
            id="descr"
            name="description"
            label="Description"
            placeholder="Description"
          />
          <input
            type="file"
            name="file"
            className="my-2 w-full"
            accept="image/*"
            placeholder="Image upload"
          />
          <div className="mt-5 text-center">
            <button
              type="submit"
              className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            >
              Submit form
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadDemo;
