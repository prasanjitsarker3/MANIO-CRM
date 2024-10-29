"use client";
import {
  GalleryHorizontal,
  Layout,
  LucideIcon,
  Menu,
  User,
} from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setIsSidebarCollapsed } from "../Redux/State/sidebarSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center gap-3 ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
             hover:bg-[#ceecf5] transition-colors ${
               isActive ? "bg-[#0c9ecf] text-white" : "text-gray-700"
             }`}
      >
        <Icon className=" w-6 h-6 " />
        <span className={` ${isCollapsed ? "hidden" : "block"} font-medium  `}>
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = ` fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : " w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40 `;
  return (
    <div className={sidebarClassNames}>
      {/* Top Logo */}
      <div
        className={` flex gap-3  justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8 "
        }`}
      >
        <Image
          src={"https://cdn-icons-png.flaticon.com/128/4344/4344252.png"}
          alt=""
          width={30}
          height={30}
        />
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-xl text-[#0c9ecf]`}
        >
          Blind Archer
        </h1>
        <button
          className=" md:hidden px-3 py-3 bg-gray-300 rounded-full hover:bg-blue-100 "
          onClick={toggleSidebar}
        >
          <Menu className=" w-4 h-4" />
        </button>
      </div>
      {/* Link  */}
      <div className=" flex-grow mt-8">
        {/* links here */}

        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/info"
          icon={User}
          label="User Info"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/action"
          icon={GalleryHorizontal}
          label="Action"
          isCollapsed={isSidebarCollapsed}
        />
      </div>
      <div className={`${isSidebarCollapsed ? " hidden" : " block"} mb-10`}>
        <p className=" text-center text-sm text-gray-500">&copy:2024 Blind</p>
      </div>
    </div>
  );
};

export default Sidebar;
