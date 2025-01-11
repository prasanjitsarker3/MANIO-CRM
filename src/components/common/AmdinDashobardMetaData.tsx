/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useGetAdminDashboardDataQuery } from "../Redux/MetaDataApi/metaDataApi";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import {
  BadgeCent,
  CalendarClock,
  Check,
  Loader,
  PackageOpen,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import MonthlyDataShow from "../MetaDashboard/MonthlyDataShow";
import MonthlyFilteringDataShow from "../MetaDashboard/MonthlyFilteringDataShow";

const AmdinDashobardMetaData = () => {
  const { data, isLoading } = useGetAdminDashboardDataQuery({});
  if (isLoading) {
    return (
      <div className=" pt-16  w-full flex justify-center items-center">
        <Spinner size="lg" className=" font-bold primaryColor " />
      </div>
    );
  }

  const adminMetaData = data?.data;
  const lastSevenDaysData = data?.data?.lastSevenDaysData || [];
  const topFiveProducts = data?.data?.topFiveProduct || [];
  const monthlyData = data?.data?.formattedMonthlyData || [];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        <Link href="/admin/product">
          <div className="bg-gray-100 hover:bg-[#ceecf5] p-6 ">
            <div className=" text-center space-y-1  py-2">
              <h1 className=" text-lg  font-bold primaryColor">
                Total Products Check
              </h1>
              <PackageOpen className=" w-full flex justify-center primaryColor" />
              <h1 className=" text-lg  font-bold primaryColor">
                {adminMetaData?.totalProduct || 0}
              </h1>
            </div>
          </div>
        </Link>
        <Link href="/admin/totalorder">
          <div className="bg-gray-100 hover:bg-[#ceecf5] p-6 ">
            <div className=" text-center space-y-1  py-2">
              <h1 className=" text-lg  font-bold primaryColor">Total Orders</h1>
              <ShoppingCart className=" w-full flex justify-center primaryColor" />
              <h1 className=" text-lg  font-bold primaryColor">
                {adminMetaData?.totalOrder || 0}
              </h1>
            </div>
          </div>
        </Link>
        <Link href="/admin/totalpending">
          <div className="bg-gray-100 hover:bg-[#ceecf5] p-6 ">
            <div className=" text-center space-y-1  py-2">
              <h1 className=" text-lg  font-bold primaryColor">
                Total Pending
              </h1>
              <Loader className=" w-full flex justify-center primaryColor" />
              <h1 className=" text-lg  font-bold primaryColor">
                {adminMetaData?.totalPending || 0}
              </h1>
            </div>
          </div>
        </Link>

        <div className="bg-gray-100 hover:bg-[#ceecf5] p-6 ">
          <div className=" text-center space-y-1  py-2">
            <h1 className=" text-lg  font-bold primaryColor">Total Amount</h1>
            <BadgeCent className=" w-full flex justify-center primaryColor" />
            <h1 className=" text-lg  font-bold primaryColor">
              {adminMetaData?.totalSum || 0}
            </h1>
          </div>
        </div>

        <div className="bg-gray-100 hover:bg-[#ceecf5] p-6 ">
          <div className=" text-center space-y-1  py-2">
            <h1 className=" text-lg  font-bold primaryColor">Today Sell</h1>
            <CalendarClock className=" w-full flex justify-center primaryColor" />
            <h1 className=" text-lg  font-bold primaryColor">
              {adminMetaData?.todayConfirmOrder || 0}
            </h1>
          </div>
        </div>
        <div className="bg-gray-100 hover:bg-[#ceecf5] p-6 ">
          <div className=" text-center space-y-1  py-2">
            <h1 className=" text-lg  font-bold primaryColor">Total Complete</h1>
            <Check className=" w-full flex justify-center primaryColor" />
            <h1 className=" text-lg  font-bold primaryColor">
              {adminMetaData?.totalComplete || 0}
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-8 gap-6">
        <div className="mx-4 flex flex-col justify-between">
          <div className="overflow-x-auto bg-gray-100 p-4 h-full">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 primaryColor text-sm md:text-lg text-left">
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Total Orders</th>
                  <th className="py-2 px-4">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {lastSevenDaysData.map((data: any, index: any) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white py-4" : "bg-gray-100 py-4"
                    } hover:bg-gray-200`}
                  >
                    <td className="py-3 px-4">{data.date}</td>
                    <td className="py-3 px-4">{data.totalOrder}</td>
                    <td className="py-3 px-4">{data.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-4 flex flex-col justify-between">
          <div className="overflow-x-auto bg-gray-100 p-4 h-full">
            <table className="min-w-full table-auto border-collapse text-sm md:text-lg">
              <thead>
                <tr className="primaryColor">
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Units Sold</th>
                </tr>
              </thead>
              <tbody>
                {topFiveProducts.map((product: any, index: any) => (
                  <tr
                    key={product.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200`}
                  >
                    <td className="px-4 py-2">
                      <Image
                        src={product.photo[0]?.img}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className=" mt-6 p-10 bg-gray-100 mx-4">
        <MonthlyDataShow monthlyData={monthlyData} />
      </div>
      <div className=" mt-6 p-10 bg-gray-50 mx-4">
        <MonthlyFilteringDataShow />
      </div>
    </div>
  );
};

export default AmdinDashobardMetaData;
