"use client";

import { forwardRef, Ref, ComponentPropsWithRef } from "react";

export type IconBaseProps = ComponentPropsWithRef<"svg"> & {
  color?: string;
  size?: string | number;
  alt?: string;
};

const IconBase = (
  { color = "currentColor", size, alt, children, ...restProps }: IconBaseProps,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    width={size}
    height={size}
    viewBox="0 0 256 256"
    {...restProps}
    ref={ref}
  >
    {!!alt && <title>{alt}</title>}
    {children}
  </svg>
);

export default forwardRef<SVGSVGElement, IconBaseProps>(IconBase);
