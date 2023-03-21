"use client";
import { FC } from "react";
import Image from "next/image";
import { PrismaImage } from "~/types";

interface Props {
  image: PrismaImage;
}

const awsBucketUrl =
  `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com` as const;

const ThumbSizes = ["site_thumb", "450_thumb", "720p_thumb"] as const;

const smallestThumb = (image: PrismaImage) => {
  for (let i = 0; i < ThumbSizes.length; i++) {
    const size = ThumbSizes[i];

    const thumb = image.ImageThumbnail.find((thumb) => thumb.type === size);

    if (thumb) {
      return thumb;
    }
  }
};

const ImageEntry: FC<Props> = ({ image }) => {
  const thumb = smallestThumb(image);
  const dimensions = thumb?.dimensions ?? "270x150";

  return (
    <>
      <div className="max-h-36 overflow-hidden">
        <Image
          src={`${awsBucketUrl}/${smallestThumb(image)?.filename}`}
          alt={image.name ?? ""}
          width={Number(dimensions.split("x")[0]) ?? 270}
          height={Number(dimensions.split("x")[1]) ?? 150}
        />
      </div>
      <span className="text-sm">
        {image.name} - {image.dimensions} {thumb?.dimensions}
      </span>
    </>
  );
};

export default ImageEntry;
