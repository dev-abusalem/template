"use client";
import React from "react";
import { BellRing, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthHeaderNotification = () => {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="relative flex justify-center items-center">
          <BellRing className="hover:text-primary transition-all duration-150 cursor-pointer" />
          <div className="w-5 h-5 flex justify-center items-center rounded-full border-white border-2 bg-red-600 text-white absolute -right-2 -top-2 text-[12px] p-0.5">
            <span>{0}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute max-h-[350px] overflow-y-scroll flex justify-start items-start flex-col gap-1 -right-3 top-1 md:w-[400px]">
          {[1, 2, 3, 4, 5].map((item, index: number) => (
            <button
              key={index}
              className="p-3 text-left pr-8 w-full relative rounded-md hover:bg-gray-100 transition-all"
            >
              <h3 className="font-bold text-invms700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </h3>
              <p className="text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad,
                magnam! Odio totam
              </p>
              <X className="absolute top-5 right-2 text-gray-500 hover:text-red-300 duration-200 transition-all" />
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthHeaderNotification;
