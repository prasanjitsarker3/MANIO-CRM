import { PackageCheck, Layout, ListOrdered, FolderDot } from "lucide-react";

export const dashboardRoutes = [
  { href: "/user", icon: Layout, label: "Dashboard" },
  { href: "/user/order", icon: ListOrdered, label: "Order Management" },
  {
    href: "/user/confirm",
    icon: FolderDot,
    label: "Confirm Order",
  },
  {
    href: "/user/delivery",
    icon: PackageCheck,
    label: "Delivery Order",
  },
];
