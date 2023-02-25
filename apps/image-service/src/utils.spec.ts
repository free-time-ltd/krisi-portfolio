import sharp from "sharp";
import {
  scaleImage,
  resizeImage,
  resizeImageAspect,
  getNormalSize,
  buildUrl,
} from "./utils";
import fs from "fs";
import path from "path";

let ImageBuffer: Buffer,
  origWidth = 0,
  origHeight = 0;

beforeAll(async () => {
  const image = path.resolve(__dirname, "../../../mocks/image.png");
  const Buffer = fs.readFileSync(image);
  const { width, height } = getNormalSize(await sharp(Buffer).metadata());

  if (!width || !height) {
    throw new Error(`Could not load metadata for image: ${image}`);
  }

  ImageBuffer = Buffer;
  origWidth = width;
  origHeight = height;
});

describe("Image utilities test suite", () => {
  it("scales image down by 50%", async () => {
    const newBuf = await scaleImage(ImageBuffer, 0.5);
    const { width, height } = getNormalSize(await sharp(newBuf).metadata());

    const expectedWidth = origWidth * 0.5;
    const expectedHeight = origHeight * 0.5;

    expect(width).toEqual(expectedWidth);
    expect(height).toEqual(expectedHeight);
  });

  it("scales image up by 50%", async () => {
    const newBuf = await scaleImage(ImageBuffer, 1.5);
    const { width, height } = getNormalSize(await sharp(newBuf).metadata());

    const expectedWidth = origWidth * 1.5;
    const expectedHeight = origHeight * 1.5;

    expect(width).toEqual(expectedWidth);
    expect(height).toEqual(expectedHeight);
  });

  it("resizes image to desired width", async () => {
    const newBuf = await resizeImage(ImageBuffer, 140);
    const { width } = getNormalSize(await sharp(newBuf).metadata());

    expect(width).toEqual(140);
  });

  it("resizes image to new aspect ratio", async () => {
    const newBuf = await resizeImageAspect(ImageBuffer, "16:9");
    const { width, height } = getNormalSize(await sharp(newBuf).metadata());

    expect(width).toBe(480);
    expect(height).toBe(270);
  });
});

describe("url utilities", () => {
  it("builds url without suffix", () => {
    const url = buildUrl({
      filename: "random-test-filename",
      category: "portfolio",
      extension: "png",
    });

    expect(url).toBe("uploads/portfolio/random-test-filename.png");
  });

  it("builds url with suffix but with default glue", () => {
    const url = buildUrl({
      filename: "random-test-filename",
      category: "portfolio",
      extension: "png",
      suffix: "5x_thumb",
    });

    expect(url).toBe("uploads/portfolio/random-test-filename_5x_thumb.png");
  });

  it("builds url with non-default suffix glue", () => {
    const url = buildUrl({
      filename: "random-test-filename",
      category: "portfolio",
      extension: "png",
      suffix: "5x_thumb",
      suffixGlue: "@",
    });

    expect(url).toBe("uploads/portfolio/random-test-filename@5x_thumb.png");
  });
});
