"use client";
import { MENU_PROPS } from "@/app/types/menu.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { handleToggle } from "./logic/handleToggle";

const SettingItems = ({ showItems, setShowItems }: MENU_PROPS) => {
  // submenu data
  const submenu = [
    { name: "Manage Settings", href: "/settings/manage-settings" },
    { name: "Mail Settings", href: "/settings/mail-settings" },
    { name: "Add User", href: "/settings/add-user" },
    { name: "Add Role", href: "/settings/add-role" },
    { name: "Role List", href: "/settings/role-list" },
    { name: "Assign Role", href: "/settings/assign-role" },
    { name: "Assign Permissions", href: "/settings/assign-permissions" },
    { name: "Add Code", href: "/settings/add-code" },
  ];

  // take path form url
  const path = usePathname();
  // main path for menu
  const menuName = "/settings";

  return (
    <>
      <button
        onClick={() =>
          handleToggle({ item: menuName, showItems, setShowItems })
        }
        className={`px-3 text-white py-2 my-0.5 flex justify-between items-center gap-x-4 w-full hover:bg-slate-700 border-l-4 ${
          showItems === menuName || path.includes(menuName)
            ? "border-primary"
            : "border-transparent "
        } hover:border-primary`}
      >
        <span className="flex justify-start items-center gap-x-4">
          <IoSettingsOutline className="w-5 h-5" />
          <span>Settings</span>
        </span>
        {showItems === menuName ? (
          <IoIosArrowUp className="w-3 h-3" />
        ) : (
          <IoIosArrowDown className="w-3 h-3" />
        )}
      </button>
      <ul
        className={`${
          (showItems === menuName || path.includes(menuName)) &&
          showItems !== "/dashboard"
            ? `h-[197px] opacity-100 visible transition-all duration-150 `
            : "h-0 invisible opacity-0 transition-all duration-150 "
        } relative invms_submenu_of_left_pannel ml-12 border-l border-slate-700 text-white font-light text-sm`}
      >
        {submenu.map((item, index) => (
          <li
            key={index}
            className={` ${
              path === item.href && "font-semibold"
            } relative pl-4  w-full border-l-2 border-transparent hover:border-primary hover:bg-slate-700 `}
          >
            <Link className="w-full block py-1 " href={item.href}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SettingItems;
