"use client";
import DashboardNavbar from "@/components/common/DashboardHeader";
import { useAppSelector } from "@/components/Redux/hooks";
import DashboardSidebar from "@/components/Routes/DashboardRoutes.tsx/DashboardSidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  return (
    <div className={`flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <DashboardSidebar />
      <main
        className={` flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        } `}
      >
        <DashboardNavbar />
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
