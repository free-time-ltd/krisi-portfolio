import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="relative h-[48px] w-56 text-lg md:h-[66px] md:w-[338px]"
    >
      <svg
        width="348"
        height="102"
        viewBox="0 0 348 102"
        fill="none"
        className="absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1_7)">
          <path
            d="M336.5 0H0V60L179.5 68L165.5 80L336.5 91V0Z"
            fill="#FFF175"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1_7"
            x="0"
            y="0"
            width="347.5"
            height="102"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="10" dy="10" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_7"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_7"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <span className="relative">{children}</span>
    </button>
  );
};

export default Button;
