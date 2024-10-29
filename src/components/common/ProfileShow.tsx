"use client";
import React from "react";
import { useUserProfileDataQuery } from "../Redux/UserApi/userApi";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";

const ProfileShow = () => {
  const { data, isLoading } = useUserProfileDataQuery({});
  if (isLoading) {
    <div className=" flex justify-center items-center pt-16">
      <Spinner size="lg" />
    </div>;
  }
  const profileData = data?.data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-500"; // Green for active
      case "BLOCKED":
        return "text-blue-500"; // Blue for blocked
      case "DELETED":
        return "text-red-500"; // Red for deleted
      default:
        return "text-gray-500"; // Default gray color
    }
  };

  return (
    <div>
      <div className=" w-full bg-[#0c9ecf] h-48"></div>
      <div className=" bg-gray-100 h-[100vh] w-[90%] mx-auto -mt-24 p-12 rounded-2xl ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div>
            <Image
              src={
                profileData?.profile?.photo ||
                "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid"
              }
              alt=""
              width={300}
              height={300}
            />
          </div>
          <div className=" space-y-1">
            <h1 className="text-xl primaryColor font-bold bg-gray-200 p-1">
              {profileData?.name || "N/A"}
            </h1>
            <h2 className="text-xl text-gray-600 bg-gray-200 p-1">
              {profileData?.email || "N/A"}
            </h2>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              Designation: {profileData?.profile?.designation || "N/A"}
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              Employee ID: {profileData?.empId || "N/A"}
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              Created At:{" "}
              {new Date(profileData?.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h3>
          </div>
          <div className=" space-y-1">
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              Address: {profileData?.profile?.address || "N/A"}
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              Performance: 87 %
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              Contact: 01378856858
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              Role:{" "}
              <span className=" uppercase">{profileData?.role || "N/A"}</span>
            </h3>
            <h3 className={`text-lg text-gray-500  bg-gray-200 p-1`}>
              Status:{" "}
              <span
                className={`font-semibold ${getStatusColor(
                  profileData?.status
                )}`}
              >
                {profileData?.status || "N/A"}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShow;
