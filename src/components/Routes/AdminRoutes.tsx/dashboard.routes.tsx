import {
  Layout,
  ShieldPlus,
  Users,
  FolderOpenDot,
  ShoppingCart,
  LayoutPanelTop,
} from "lucide-react";

export const adminRoutes = [
  { href: "/admin", icon: Layout, label: "Dashboard" },
  { href: "/admin/category", icon: ShieldPlus, label: "Category" },
  { href: "/admin/product", icon: FolderOpenDot, label: "Product" },
  { href: "/admin/totalorder", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/user", icon: Users, label: "Moderator" },
  { href: "/admin/banner", icon: LayoutPanelTop, label: "Banner" },
];
