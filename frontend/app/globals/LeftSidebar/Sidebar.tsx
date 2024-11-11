"use client";
import Image from "next/image";
import React, { useState } from "react";
import { TfiDashboard } from "react-icons/tfi";
import ProductItems from "./MenuItems/ProductItems";
import Link from "next/link";
import SettingItems from "./MenuItems/SettingItems";

const Sidebar = () => {
  const [showItems, setShowItems] = useState<string>("/");

  return (
    <aside className="min-h-screen overflow-scroll fixed top-0 w-[250px] bg-slate-800">
      {/* <div className="flex justify-center items-center py-3 w-full">
        <Image
          src="/icons/amio.logo.white.png"
          width={60}
          height={60}
          alt="logo"
          className="w-[60px] h-full object-cover"
        />
      </div> */}
      <div className="flex bg-white border-r justify-center items-center py-3 w-full">
        <Image
          src="/icons/amio logo.png"
          width={60}
          height={60}
          alt="logo"
          className="w-[107px] h-full object-cover"
        />
      </div>
      <div className="flex mt-5 justify-center items-center"></div>
      <div>
        <Link
          onClick={() => setShowItems("/dashboard")}
          href="/"
          className={`${
            showItems === "/dashboard"
              ? "border-primary"
              : "border-transparent "
          } px-3 my-0.5 text-white py-2 hover:border-primary flex justify-start items-center gap-x-4 w-full hover:bg-slate-700 border-l-4 `}
        >
          <TfiDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        {/* start first items */}

        {/* customer menu item end */}
        {/* product menu item start */}
        <ProductItems setShowItems={setShowItems} showItems={showItems} />
        {/* product menu item end */}

        {/* settings menu item end */}
        <SettingItems setShowItems={setShowItems} showItems={showItems} />
        {/* settings menu item end */}
      </div>
    </aside>
  );
};

export default Sidebar;
