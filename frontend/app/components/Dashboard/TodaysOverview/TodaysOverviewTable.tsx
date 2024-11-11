import { CURRENCY } from "@/app/constant/currency";
import React from "react";

const TodaysOverviewTable = () => {
  return (
    <>
      <div className="w-full">
        <table className="w-full shadow">
          <thead className="bg-invms500 whitespace-nowrap">
            <tr className="">
              <th className="p-4 font-semibold text-left text-md text-white">
                Today&apos;s Report
              </th>
              <th className="p-4 ont-semibold text-left text-md text-white">
                {CURRENCY}
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            <tr className="even:bg-blue-50">
              <td className="p-4 text-sm text-black">Total Sales</td>
              <td className="p-4">0.00 {CURRENCY}</td>
            </tr>
            <tr className="even:bg-slate-100">
              <td className="p-4 text-sm text-black">Total Purchase</td>
              <td className="p-4">0.00 {CURRENCY}</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full shadow mt-5">
          <thead className="bg-invms500 whitespace-nowrap">
            <tr className="">
              <th className="p-4 font-semibold text-left text-md text-white">
                Latest &apos;s Report
              </th>
              <th className="p-4 ont-semibold text-left text-md text-white">
                {CURRENCY}
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            <tr className="even:bg-blue-50">
              <td className="p-4 text-sm text-black">Last Sales</td>
              <td className="p-4">0.00 {CURRENCY}</td>
            </tr>
            <tr className="even:bg-blue-50">
              <td className="p-4 text-sm text-black">Last Sales</td>
              <td className="p-4">0.00 {CURRENCY}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodaysOverviewTable;
