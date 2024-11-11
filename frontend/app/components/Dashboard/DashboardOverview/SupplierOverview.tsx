"use client";
import { useGetSuppliers } from "@/app/services/hooks/useSupplier";
import Link from "next/link";
import React from "react";
import { FaUsers, FaUserSecret, FaUserTie } from "react-icons/fa";

const SupplierOverview = ({ data }: any) => {
  return (
    <div className="border col-span-1  pb-10 relative shadow-md text-white border-cyan-600 bg-cyan-600">
      <div className="p-4 z-10">
        <h3 className="font-bold text-2xl">
          {data?.totalSuppliers || "Loading..."}
        </h3>
        <p>Total Supplier</p>
      </div>
      <Link
        href="/supplier/supplier-list"
        className="absolute text-center py-1 text-sm bg-cyan-900 bg-opacity-80 w-full bottom-0"
      >
        Total Supplier
      </Link>
      <FaUserTie className=" text-cyan-950 opacity-30 w-20 h-20 absolute top-2.5 right-5" />
    </div>
  );
};

export default SupplierOverview;
