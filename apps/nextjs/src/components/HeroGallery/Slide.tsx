import Image from "next/image";
import type { FC } from "react";
import type { GalleryImage } from "@portfolio/db/models/image.model";

interface Props {
  image: GalleryImage;
  priority?: boolean;
}

const Slide: FC<Props> = ({ image, priority = false }) => (
  <picture className="h-full w-full">
    <Image
      src={image.src}
      alt={image.name ?? `Slider for image`}
      width={image.width}
      height={image.height}
      priority={priority}
    />
  </picture>
);

export default Slide;
