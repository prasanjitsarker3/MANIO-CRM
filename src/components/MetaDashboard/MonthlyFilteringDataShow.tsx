/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { currentMonth, months } from "@/components/Utlities/generateMonthRange";
import { useGetMonthlyDataQuery } from "@/components/Redux/MetaDataApi/metaDataApi";

type MonthlyData = {
  totalCancelOrder: number;
  totalConfirmOrder: number;
  totalDeliveryOrder: number;
  totalOrder: number;
  totalProduct: number;
  totalProductSellAmount: number;
  totalReturnOrder: number;
};

const monthlyDataLabels: Record<keyof MonthlyData, string> = {
  totalCancelOrder: "Total Cancelled Orders",
  totalConfirmOrder: "Total Confirmed Orders",
  totalDeliveryOrder: "Total Delivered Orders",
  totalOrder: "Total Orders",
  totalProduct: "Total Products",
  totalProductSellAmount: "Total Product Sell Amount",
  totalReturnOrder: "Total Returned Orders",
};

const MonthlyFilteringDataShow = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const query = { selectedMonth };
  const { data, isLoading } = useGetMonthlyDataQuery(query);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const monthlyData: MonthlyData | undefined = data?.data;

  return (
    <div>
      <div className=" w-full">
        {/* Month Selector */}
        <div className="w-full flex justify-end mb-6">
          <Select
            className="w-60"
            selectedKeys={new Set([selectedMonth])}
            onSelectionChange={
              //@ts-ignore
              (keys) => setSelectedMonth([...keys][0] as string)
            }
          >
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Monthly Data Table */}
        <div className="rounded-md ">
          <table className="min-w-full border-collapse border border-gray-100">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b font-medium text-left text-gray-700">
                  Metric
                </th>
                <th className="px-4 py-2 border-b font-medium text-left text-gray-700">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData ? (
                Object.entries(monthlyData).map(([key, value]) => (
                  <tr
                    key={key}
                    className={`border-b border-gray-200 ${
                      Object.keys(monthlyData).indexOf(key) % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2 font-medium text-gray-700 capitalize">
                      {monthlyDataLabels[key as keyof MonthlyData] || key}
                    </td>
                    <td className="px-4 py-2 text-gray-900">{value}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center text-gray-500 py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonthlyFilteringDataShow;
