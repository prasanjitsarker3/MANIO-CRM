"use client";
import DashboardNavbar from "@/components/common/DashboardHeader";
import { useAppSelector } from "@/components/Redux/hooks";
import AdminSidebar from "@/components/Routes/AdminRoutes.tsx/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <div className={`flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <AdminSidebar />
      <main
        className={` flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        } `}
      >
        <DashboardNavbar />
        {children}
        <div className="w-full uppercase pt-3 justify-center py-2 flex items-center gap-2 text-lg text-center font-bold primaryColor">
          <h1>Developed by</h1>
          <a
            href="https://www.wevloper.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#009975] uppercase"
          >
            Wevloper
          </a>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
