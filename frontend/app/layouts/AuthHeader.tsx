"use client";
import React from "react";
import AuthHeaderNotification from "./AuthHeader/AuthHeaderNotification";
import AuthProfileDropdown from "./AuthHeader/AuthProfileDropdown";
import { Menu } from "lucide-react";
import MobileHeader from "./MobileHeader";

const AuthHeader = () => {
  return (
    <header className="flex justify-between lg:justify-end items-center px-8 py-3 bg-white shadow-md">
      <div className="flex lg:hidden">
        <MobileHeader />
      </div>
      <div className="flex justify-end items-center gap-3">
        <AuthHeaderNotification />
        <AuthProfileDropdown />
      </div>
    </header>
  );
};

export default AuthHeader;
