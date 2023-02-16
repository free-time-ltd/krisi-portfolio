"use client";

import { FC, HTMLAttributes, useState } from "react";
import TextField from "./TextField";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Props extends HTMLAttributes<HTMLFormElement> {
  categories?: Category[];
}

const Form: FC<Props> = ({ categories }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const file = formData.get("file") as File;

    if (!file) {
      console.error("No file specified");
    }

    formData.delete("file");

    formData.append("mime", file.type);

    try {
      setLoading(true);

      const {
        data: { url, hash },
      } = await fetch("/api/images/upload", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      const awsResp = await fetch(url, {
        method: "PUT",
        body: file,
      }).then((res) => (res.status !== 200 ? Promise.reject(res) : res));

      if (awsResp.ok) {
        e.currentTarget.reset();
        pollState(hash);
      }
    } catch (e) {
      if (e instanceof Response) {
        const error = await e.text();
        console.log("aws error", error);
        console.error(error);
      } else {
        console.log("aws error", e);
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  const pollState = async (hash: string) => {
    try {
      const state = await fetch(`/api/images/state/${hash}`).then((res) =>
        res.json()
      );

      if (state.data.status === "new") {
        setTimeout(() => pollState(hash), 2500);
      } else if (state.data.status === "complete") {
        alert("Image upload complete");
      } else if (state.data.status === "error") {
        alert(`Error: ${state.data.log}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form method="post" action="" onSubmit={handleSubmit}>
      <TextField id="name" name="name" label="Name" placeholder="Name" />
      <TextField
        id="descr"
        name="description"
        label="Description"
        placeholder="Description"
        required
      />
      {categories && categories.length > 0 && (
        <select
          name="category"
          title="category selector"
          className="my-4 block w-full py-2"
          required
        >
          <option>Please select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      )}
      <input
        type="file"
        name="file"
        className="my-2 w-full"
        accept="image/*"
        placeholder="Image upload"
        required
      />
      <div className="mt-5 text-center">
        <button
          className={`rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 ${
            loading ? "cursor-not-allowed opacity-25" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit form"}
        </button>
      </div>
    </form>
  );
};

export default Form;
