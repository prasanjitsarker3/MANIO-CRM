"use client";
import { Menu, PowerOff, Settings } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";

import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setIsSidebarCollapsed } from "../Redux/State/sidebarSlice";
import { logOut } from "../Redux/State/authSlice";
import { logoutUser } from "../ServerRender/logoutUser";
import { usePathname, useRouter } from "next/navigation";
import { useMyProfileQuery } from "../Redux/UserApi/userApi";
import BreadcrumbHeader from "./Breadcrumbs";
import Link from "next/link";

const DashboardNavbar = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useMyProfileQuery({});
  const router = useRouter();
  const pathname = usePathname();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const handleLogOut = () => {
    dispatch(logOut());
    logoutUser(router);
  };
  if (isLoading) {
    <div className=" w-full flex justify-center items-center pt-8">
      <Spinner />
    </div>;
  }
  const profileData = data?.data;

  return (
    <div className=" flex justify-between items-center w-full mb-7 ">
      {/* Left Side */}
      <div className=" flex  justify-between items-center gap-5">
        <button
          className=" px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className=" w-4 h-4" />
        </button>

        <BreadcrumbHeader />
      </div>
      {/* Right Side */}
      <div className=" flex justify-between items-center gap-5">
        {profileData?.role === "admin" && (
          <Link href={pathname.startsWith("/admin") ? "/user" : "/admin"}>
            <button className="bg-[#0c9ecf] text-white py-1 px-4">
              Switch Dashboard
            </button>
          </Link>
        )}
        <Dropdown>
          <DropdownTrigger>
            <div className=" px-2 py-2  rounded-full bg-[#0c9ecf] text-white">
              <Settings className=" cursor-pointer  " size={20} />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">{profileData?.name || "N/A"}</DropdownItem>
            <DropdownItem key="copy">
              {profileData?.email || "N/A"}
            </DropdownItem>
            <DropdownItem key="edit">{profileData?.role || "N/A"}</DropdownItem>
            <DropdownItem
              onClick={handleLogOut}
              key="delete"
              className=" flex items-center bg-[#F31260] text-white"
              color="danger"
            >
              <h1 className="flex text-base items-center gap-2">
                {" "}
                Logout <PowerOff size={16} />
              </h1>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default DashboardNavbar;
