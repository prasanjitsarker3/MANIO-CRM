"use client";
import { useGetModeratorDashboardDataQuery } from "@/components/Redux/MetaDataApi/metaDataApi";
import { Spinner } from "@nextui-org/react";
import React from "react";

const UserDashbord = () => {
  const { data, isLoading } = useGetModeratorDashboardDataQuery({});
  if (isLoading) {
    return (
      <div className=" pt-16  w-full flex justify-center items-center">
        <Spinner size="lg" className=" font-bold primaryColor " />
      </div>
    );
  }

  const metaData = data?.data;

  return (
    <div className=" bg-white p-10">
      <div className=" grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        <div className=" hover:bg-[#0c9ecf] hover:text-white transition-colors duration-300 ease-in-out text-[#0c9ecf] bg-gray-100">
          <div className="  py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Total Pending</h1>
            <h1>{metaData?.totalPendingOrder || 0}</h1>
          </div>
        </div>
        <div className="  hover:bg-[#0c9ecf] hover:text-white transition-colors duration-300 ease-in-out text-[#0c9ecf] bg-gray-100">
          <div className="  py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Total Confirm</h1>
            <h1>{metaData?.totalCompleteOrder || 0}</h1>
          </div>
        </div>
        <div className="  hover:bg-[#0c9ecf] hover:text-white transition-colors duration-300 ease-in-out text-[#0c9ecf] bg-gray-100">
          <div className="  py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Total Cancel</h1>
            <h1>{metaData?.totalCancelOrder || 0}</h1>
          </div>
        </div>
        <div className="  hover:bg-[#0c9ecf] hover:text-white transition-colors duration-300 ease-in-out text-[#0c9ecf] bg-gray-100">
          <div className="  py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Today Pending</h1>
            <h1>{metaData?.todayPendingOrder || 0}</h1>
          </div>
        </div>
        <div className="  hover:bg-[#0c9ecf] hover:text-white transition-colors duration-300 ease-in-out text-[#0c9ecf] bg-gray-100">
          <div className="  py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Total Confirm</h1>
            <h1>{metaData?.todayConfirmOrder || 0}</h1>
          </div>
        </div>
        <div className="  hover:bg-[#0c9ecf] hover:text-white transition-colors duration-300 ease-in-out text-[#0c9ecf] bg-gray-100">
          <div className="  py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Today Cancel</h1>
            <h1>{metaData?.todayCancelOrder || 0}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashbord;
