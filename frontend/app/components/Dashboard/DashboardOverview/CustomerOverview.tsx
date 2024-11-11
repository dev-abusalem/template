"use client";
import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";

const CustomerOverview = ({ data }: any) => {
  // Fetch customers from API using the useGetCustomers hook

  return (
    <div className="border col-span-1 pb-10 relative shadow-md text-white border-green-600 bg-green-600">
      <div className="p-4 z-10">
        <h3 className="font-bold text-2xl">
          {data?.totalCustomers || "Loading..."}
        </h3>
        <p>Total Customer</p>
      </div>
      <Link
        href="/customer/customer-list"
        className="absolute text-center py-1 text-sm bg-green-900 bg-opacity-80 w-full bottom-0"
      >
        Total Customer
      </Link>
      <FaUsers className=" text-green-950 opacity-30 w-24 h-24 absolute top-0 right-5" />
    </div>
  );
};

export default CustomerOverview;
