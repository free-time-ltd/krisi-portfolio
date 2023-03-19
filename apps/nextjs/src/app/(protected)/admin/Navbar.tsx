import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import Logo from "~/public/logo-light.png";
import Hamburger from "~/components/Admin/Icons/Hamburger";

const defaultAvatar = (email: string | null | undefined) => {
  return `https://i.pravatar.cc/250?u=${encodeURIComponent(
    email ?? "unknown"
  )}`;
};

const Navbar = async () => {
  const sess = await getServerSession(authOptions);

  return (
    <section className="navbar flex justify-between">
      <div className="logo flex items-center gap-4">
        <div className="mx-2">
          <button type="button" title="Toggle sidebar">
            <Hamburger className="h-6 w-6 text-white transition duration-75 group-hover:text-gray-900" />
          </button>
        </div>
        <span className="text-xl font-medium">Admin Panel</span>
      </div>
      <Image src={Logo} alt="Kristina Kostova Portfolio Logo" />
      <div className="user flex items-center gap-3">
        <span className="text-sm font-medium">{sess?.user.name}</span>
        <div className="relative">
          <img
            id="avatarButton"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="h-10 w-10 cursor-pointer rounded-full"
            src={sess?.user.image ?? defaultAvatar(sess?.user.email)}
            alt="User dropdown"
          />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
