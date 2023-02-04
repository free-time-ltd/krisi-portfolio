import type { FC } from "react";
import Image from "next/image";
import Button from "~/components/Button";
import type { GalleryImage } from "~/utils/image";

interface Props {
  images: GalleryImage[];
}

const HeroGallery: FC<Props> = ({ images }) => {
  return (
    <>
      <div className="relative z-10 flex flex-col">
        {images.map((image, index) => (
          <picture className="h-full w-full" key={image.src}>
            <Image
              src={image.src}
              alt={image.name ?? `Slider for image #${index}`}
              width={image.width}
              height={image.height}
            />
          </picture>
        ))}
      </div>
      <div className="my-10 text-center">
        <Button type="button">Click here</Button>
      </div>
    </>
  );
};

export default HeroGallery;
