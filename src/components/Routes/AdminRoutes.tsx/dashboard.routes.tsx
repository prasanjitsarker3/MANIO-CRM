import {
  Layout,
  ShieldPlus,
  Users,
  FolderOpenDot,
  ShoppingCart,
  LayoutPanelTop,
  CornerDownLeft,
} from "lucide-react";

export const adminRoutes = [
  { href: "/admin", icon: Layout, label: "Dashboard" },
  { href: "/admin/banner", icon: LayoutPanelTop, label: "Manage Banners" },
  { href: "/admin/category", icon: ShieldPlus, label: "Product Categories" },
  { href: "/admin/product", icon: FolderOpenDot, label: "All Products" },
  { href: "/admin/totalorder", icon: ShoppingCart, label: "Customer Orders" },
  { href: "/admin/return", icon: CornerDownLeft, label: "Return Orders" },
  { href: "/admin/user", icon: Users, label: "Emp Management" },
];
