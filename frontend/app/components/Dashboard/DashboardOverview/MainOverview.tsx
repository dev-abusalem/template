import React, { useEffect } from "react";
import CustomerOverview from "./CustomerOverview";
import ProductOverview from "./ProductOverview";
import OrderOverview from "./OrderOverview";
import SupplierOverview from "./SupplierOverview";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/app/context/slices/productSlice";
import { AppDispatch } from "@/app/context/store";
import { useGetDashboard } from "@/app/services/hooks/useAuth";

const MainOverview = ({ data }: any) => {
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between gap-x-5 py-5 ">
      <CustomerOverview data={data} />
      <ProductOverview data={data} />
      <OrderOverview data={data} />
      <SupplierOverview data={data} />
    </div>
  );
};

export default MainOverview;
