"use client";
import { FC } from "react";
import IconBase, { IconBaseProps } from "./IconBase";

const Hamburger: FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
  </IconBase>
);

export default Hamburger;
