"use client";
import React from "react";
import SalePermissionsTable from "./All_Permissions_Items/SalePermissionsTable";
import CustomerPermissionsTable from "./All_Permissions_Items/CustomerPermissionsTable";
import { SubmitButton } from "@/app/globals/Buttons/AllButtons";

const AddPermissionMain = () => {
  return (
    <>
      <div className="mt-2 mb-6 px-4">
        <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
          <h2 className="text-xl text-gray-800 font-bold mb-4">
            Assign Permissions
          </h2>
          <input
            type="text"
            placeholder="Search permission..."
            className="py-1 border border-slate-200 px-3 w-[400px] rounded-md "
          />
        </div>
      </div>
      <form action="">
        <SalePermissionsTable />
        <CustomerPermissionsTable />
        <div className="mt-3 mb-6 px-4">
          <SubmitButton>Save Permissions</SubmitButton>
        </div>
      </form>
    </>
  );
};

export default AddPermissionMain;
