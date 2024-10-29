/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MonthlyDataShow from "@/components/MetaDashboard/MonthlyDataShow";
import { useGetAdminDashboardDataQuery } from "@/components/Redux/MetaDataApi/metaDataApi";
import { Spinner } from "@nextui-org/react";
import {
  BadgeCent,
  CalendarClock,
  Check,
  Loader,
  PackageOpen,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminDashboard = () => {
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
    <div className=" bg-white p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        <Link href="/admin/product">
          <div className="bg-gray-100 hover:bg-[#ceecf5] p-6 ">
            <div className=" text-center space-y-1  py-2">
              <h1 className=" text-lg  font-bold primaryColor">
                Total Products
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
          {/* <h2 className="text-xl font-bold mb-4">Last 7 Days Orders</h2> */}
          <div className="overflow-x-auto bg-gray-100 p-4 h-full">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 primaryColor text-left">
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
          {/* <h1 className="text-2xl font-bold mb-4 text-center">Top Products</h1> */}
          <div className="overflow-x-auto bg-gray-100 p-4 h-full">
            <table className="min-w-full table-auto border-collapse">
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
    </div>
  );
};

export default AdminDashboard;