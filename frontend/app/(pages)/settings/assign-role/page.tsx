import AssignRoleMain from "@/app/components/Settings/Assign_Role/AssignRoleMain";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Assign Role - INVMS",
  description: "Investment Management Software",
};

const page = () => {
  return <AssignRoleMain />;
};

export default page;
