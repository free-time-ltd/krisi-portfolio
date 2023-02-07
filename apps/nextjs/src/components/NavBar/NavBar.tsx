import type { FC } from "react";
import type { Category } from "@prisma/client";
import Logo from "~/components/Logo";

interface Props {
  categories: Category[];
}

const NavBar: FC<Props> = ({ categories }) => (
  <div className="flex items-center justify-between bg-white p-5">
    <div className="w-10">
      <Logo white={false} />
    </div>
    <ul className="flex gap-4 font-medium">
      <li>Home</li>
      {categories.map((category) => (
        <li key={category.slug}>{category.name}</li>
      ))}
      <li>About me</li>
      <li>Contacts</li>
      <li>Testimonials</li>
      <li>Connect</li>
    </ul>
  </div>
);

export default NavBar;
