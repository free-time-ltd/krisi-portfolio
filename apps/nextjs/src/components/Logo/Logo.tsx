import type { FC } from "react";
import Image from "next/image";
import LogoWhite from "/public/logo-light.png";
import LogoDark from "/public/logo.png";

interface Props {
  white: boolean;
  url?: string;
  alt?: string;
  title?: string;
}

const Logo: FC<Props> = ({ url = "/", white = true, alt, title }) => (
  <a href={url} title={title}>
    <Image
      src={white ? LogoWhite : LogoDark}
      alt={alt ?? "Kristina Kostova Logo"}
    />
  </a>
);

export default Logo;
