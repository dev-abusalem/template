"use client";
import React from "react";
import dynamic from "next/dynamic";
import Announcebar from "./Announcebar/Announcebar";
import MainOverview from "./DashboardOverview/MainOverview";
import TodaysOverviewTable from "./TodaysOverview/TodaysOverviewTable";
import { useGetDashboard } from "@/app/services/hooks/useAuth";
const TopSaleProductChart = dynamic(
  () => import("./TopSaleProduct/TopSaleProductChart"),
  { ssr: false }
);
const ExpenseChart = dynamic(() => import("./ExpenseChart/ExpenseChart"), {
  ssr: false,
});
const SalesAndPurchaseChart = dynamic(
  () => import("./SalesAndPurchase/SalesAndPurchaseChart"),
  { ssr: false }
);

const DashboardMain = () => {
  const { data, isLoading, error } = useGetDashboard();

  return (
    <>
      <Announcebar />
      <MainOverview data={data} />
      <div className="grid mt-5 grid-cols-5 gap-x-5 justify-between items-center">
        <div className="col-span-3 bg-white p-5">
          <div className="pb-3 border-b">
            <h2 className="text-xl font-bold">Top Sale Products</h2>
          </div>
          <div className="mt-4">
            <TopSaleProductChart />
          </div>
        </div>
        <div className="col-span-2 bg-white p-5 h-full">
          <div className="pb-3 border-b">
            <h2 className="text-xl font-bold">Top Sale Products</h2>
          </div>
          <div className="flex justify-center items-center h-full">
            <ExpenseChart />
          </div>
        </div>
      </div>

      {/* sales and purchase and today sales section */}
      <div className="grid mt-5 grid-cols-6 gap-x-5 justify-between items-start">
        <div className="col-span-4 bg-white p-5">
          <div className="pb-3 border-b">
            <h2 className="text-xl font-bold">Sales And Purchase Report</h2>
          </div>
          <div className="mt-4">
            <SalesAndPurchaseChart />
          </div>
        </div>
        <div className="col-span-2 bg-white p-5 h-full">
          <div className="pb-3 border-b">
            <h2 className="text-xl font-semibold">Todays Overview</h2>
          </div>
          <div className="flex justify-center items-start h-full">
            <TodaysOverviewTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMain;
