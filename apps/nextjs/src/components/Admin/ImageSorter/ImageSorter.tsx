"use client";
import { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import type { ImageEntry as ImageEntryType } from "~/types";
import ImageEntry from "./ImageEntry";

interface Props {
  category: { id: string; name: string | null };
  images: ImageEntryType[];
}

const ImageSorter: FC<Props> = ({ category, images }) => {
  const [imageList, setImageList] = useState<ImageEntryType[]>(images);

  const onListChange = (newList: ImageEntryType[]) => {
    setImageList(newList);
  };

  return (
    <ReactSortable
      list={imageList}
      setList={onListChange}
      animation={200}
      delayOnTouchOnly={true}
      delay={2}
      tag="ul"
      className="image-sorter grid grid-cols-5 gap-4"
    >
      {imageList.map((image) => (
        <li key={image.id.toString()}>
          <ImageEntry image={image} />
        </li>
      ))}
    </ReactSortable>
  );
};

export default ImageSorter;
