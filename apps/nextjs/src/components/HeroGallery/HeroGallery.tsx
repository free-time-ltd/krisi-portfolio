"use client";

import type { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import type { GalleryImage } from "@portfolio/db/models/image.model";
import Slide from "./Slide";

interface Props {
  images: GalleryImage[];
}

const HeroGallery: FC<Props> = ({ images }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="relative z-10 flex items-center justify-center">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            dynamicHeight={false}
            showStatus={false}
            showArrows
            stopOnHover
            emulateTouch
          >
            {images.map((image, index) => (
              <Slide image={image} priority={index === 0} key={image.name} />
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default HeroGallery;
