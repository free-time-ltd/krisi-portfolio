"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarLinkEntry } from "~/types";

const SidebarLink = ({ link }: { link: SidebarLinkEntry }) => {
  const currentUrl = usePathname();

  return (
    <Link
      key={link.id}
      href={link.href}
      className={`${
        currentUrl === link.href ? "bg-white bg-opacity-10" : ""
      } flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
    >
      {!!link.icon && (
        <link.icon className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
      )}
      <span className="ml-3">{link.label}</span>
    </Link>
  );
};

export default SidebarLink;
