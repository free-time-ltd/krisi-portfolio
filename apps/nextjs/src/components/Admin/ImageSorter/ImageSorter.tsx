"use client";
import Image from "next/image";
import { FC, useState } from "react";
import type { PrismaImage } from "~/types";
import ImageEntry from "./ImageEntry";

interface Props {
  category: any;
  images: PrismaImage[];
  onSortUpdate?: (_cat: any, _arg: any) => void;
}

const ImageSorter: FC<Props> = ({ category, images }) => {
  const [imageList, setImageList] = useState([...images]);

  return (
    <ul className="image-sorter flex flex-wrap gap-4">
      {imageList.map((image) => (
        <li key={image.id.toString()}>
          <ImageEntry image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageSorter;
