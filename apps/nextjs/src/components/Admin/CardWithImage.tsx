"use client";

import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface Props {
  href: string;
  imageSrc: string;
  title: string;
  subtitle?: string;
}

const CardWithImage: FC<PropsWithChildren<Props>> = ({
  href,
  imageSrc,
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <Link href={href}>
        <img className="rounded-t-lg" src={imageSrc} alt={title} />
      </Link>
      <div className="p-5">
        <Link href={href}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        {subtitle && (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default CardWithImage;
