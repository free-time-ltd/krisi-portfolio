import type { FC } from "react";
import Image from "next/image";
import LogoWhite from "/public/logo-light.png";
import LogoDark from "/public/logo.png";

interface Props {
  white: boolean;
  alt?: string;
}

const Logo: FC<Props> = ({ white = true, alt }) => (
  <a href="/" title="Kristina Kostova Homepage">
    <Image
      src={white ? LogoWhite : LogoDark}
      alt={alt ?? "Kristina Kostova Logo"}
    />
  </a>
);

export default Logo;
