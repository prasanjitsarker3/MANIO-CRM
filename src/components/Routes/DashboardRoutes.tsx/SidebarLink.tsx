import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

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
        } hover:bg-[#ceecf5] transition-colors ${
          isActive ? "bg-[#0c9ecf] text-white" : "text-gray-700"
        }`}
      >
        <Icon className="w-6 h-6" />
        <span className={`${isCollapsed ? "hidden" : "block"} font-medium`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
