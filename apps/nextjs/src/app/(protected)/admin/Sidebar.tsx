import { BaseSignOut } from "~/components/Auth";
import Dashboard from "~/components/Admin/Icons/Dashboard";
import Gallery from "~/components/Admin/Icons/Gallery";
import Testimonials from "~/components/Admin/Icons/Testimonials";
import Commissions from "~/components/Admin/Icons/Commissions";
import Settings from "~/components/Admin/Icons/Settings";
import GoBack from "~/components/Admin/Icons/GoBack";
import SidebarLink from "~/components/SidebarLink";
import { SidebarLinkEntry } from "~/types";

export const SidebarLinks: SidebarLinkEntry[] = [
  {
    id: "dashboard",
    href: "/admin",
    label: "Dashboard",
    icon: Dashboard,
  },
  {
    id: "gallery",
    href: "/admin/gallery",
    label: "Gallery",
    icon: Gallery,
  },
  {
    id: "testimonials",
    href: "/admin/testimonials",
    label: "Testimonials",
    icon: Testimonials,
  },
  {
    id: "commissions",
    href: "/admin/commissions",
    label: "Commissions",
    icon: Commissions,
  },
  {
    id: "settings",
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    id: "goBack",
    href: "/",
    label: "Back to site",
    icon: GoBack,
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar -translate-x-full transition-transform sm:translate-x-0">
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <ul className="flex h-full flex-col">
          {SidebarLinks.map((link) => (
            <li key={link.id}>
              <SidebarLink link={link} />
            </li>
          ))}
          <li className="mt-auto w-full self-end justify-self-end">
            <BaseSignOut className="flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                viewBox="0 0 256 256"
              >
                <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path>
              </svg>
              <span className="ml-3">Logout</span>
            </BaseSignOut>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
