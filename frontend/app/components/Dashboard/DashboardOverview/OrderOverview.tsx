import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";

const OrderOverview = ({ data }: any) => {
  return (
    <div className="border col-span-1  pb-10 relative shadow-md text-white border-violet-600 bg-violet-600">
      <div className="p-4 z-10">
        <h3 className="font-bold text-2xl">
          {data?.totalPurchases || "Loading..."}
        </h3>
        <p>Total Purchase</p>
      </div>
      <Link
        href="/"
        className="absolute text-center py-1 text-sm bg-violet-900 bg-opacity-80 w-full bottom-0"
      >
        Total Order
      </Link>
      <FaSackDollar className=" text-violet-950 opacity-30 w-20 h-20 absolute top-2.5 right-5" />
    </div>
  );
};

export default OrderOverview;
