import { prisma } from "@portfolio/db";
import { notFound } from "next/navigation";

interface Props {
  params: { image: string };
}

const fetchImage = (id: number) => prisma.image.findFirst({ where: { id } });

const ImagePage = async ({ params: { image } }: Props) => {
  const imageId = isNaN(Number(image)) ? 0 : Number(image);
  const img = await fetchImage(imageId);
  if (!img) {
    notFound();
  }

  return (
    <div>
      <h1>This is should show image {image}</h1>
    </div>
  );
};

export default ImagePage;
