"use client";
import { useGetProducts } from "@/app/services/hooks/useProduct";
import Link from "next/link";
import React from "react";
import { GiShoppingBag } from "react-icons/gi";
import { useSelector } from "react-redux";

const ProductOverview = ({ data }: any) => {
  // Fetch customers from API using the useGetCustomers hook
  // const products = useSelector((state: any) => state.product.products);
  return (
    <div className="border col-span-1  pb-10 relative shadow-md text-white border-yellow-600 bg-yellow-600">
      <div className="p-4 z-10">
        <h3 className="font-bold text-2xl">
          {data?.totalProducts || "Loading..."}
        </h3>
        <p>Total Product</p>
      </div>
      <Link
        href="/product/product-list"
        className="absolute text-center py-1 text-sm bg-yellow-900 bg-opacity-80 w-full bottom-0"
      >
        Total Product
      </Link>
      <GiShoppingBag className=" text-yellow-950 opacity-30 w-20 h-20 absolute top-2.5 right-5" />
    </div>
  );
};

export default ProductOverview;
