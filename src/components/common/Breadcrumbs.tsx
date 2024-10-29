/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import {
  Breadcrumbs as NextUIBreadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItemType {
  name: string;
  path: string;
  disabled?: boolean;
}

const BreadcrumbHeader: React.FC = () => {
  const currentPath = usePathname();

  const breadcrumbItems: Record<
    string,
    BreadcrumbItemType[] | ((id: string) => BreadcrumbItemType[])
  > = {
    "/user": [{ name: "Dashboard", path: "/user" }],
    "/user/order": [
      { name: "Dashboard", path: "/user" },
      { name: "Order", path: "/user/order" },
    ],
    "/user/order/[id]": (id: string) => [
      { name: "Dashboard", path: "/user" },
      { name: "Order", path: "/user/order" },
      { name: "Order View", path: `/user/order/${id}`, disabled: true },
    ],
    "/user/confirm": [
      { name: "Dashboard", path: "/user" },
      { name: "Confirm", path: "/user/confirm" },
    ],

    "/user/delivery": [
      { name: "Dashboard", path: "/user" },
      { name: "Delivery", path: "/user/delivery" },
    ],
    "/user/delivery/[id]": (id: string) => [
      { name: "Dashboard", path: "/user" },
      { name: "Delivery", path: "/user/delivery" },
      { name: `Delivery View`, path: `/user/delivery/${id}`, disabled: true },
    ],

    //AdminSection

    "/admin": [{ name: "Dashboard", path: "/admin" }],
    "/admin/category": [
      { name: "Dashboard", path: "/admin" },
      { name: "Category", path: "/admin/category" },
    ],
    "/admin/product": [
      { name: "Dashboard", path: "/admin" },
      { name: "All Products", path: "/admin/product" },
    ],
    // "/admin/product/create": [
    //   { name: "Dashboard", path: "/admin" },
    //   { name: "All Products", path: "/admin/product" },
    //   { name: "Create Product", path: "/admin/product/create" },
    // ],

    "/admin/product/view/[id]": (id: string) => [
      { name: "Dashboard", path: "/admin" },
      { name: "All Products", path: "/admin/product" },
      {
        name: "Product View",
        path: `/admin/product/view/${id}`,
        disabled: true,
      },
    ],
    "/admin/product/[id]": (id: string) => [
      { name: "Dashboard", path: "/admin" },
      { name: "All Products", path: "/admin/product" },
      {
        name: "Product Update",
        path: `/admin/product/${id}`,
        disabled: true,
      },
    ],
    "/admin/user": [
      { name: "Dashboard", path: "/admin" },
      { name: "All Employee", path: "/admin/user" },
    ],
    "/admin/totalorder": [
      { name: "Dashboard", path: "/admin" },
      { name: "All Orders", path: "/admin/totalorder" },
    ],
    "/admin/totalorder/[id]": (id: string) => [
      { name: "Dashboard", path: "/admin" },
      { name: "All Order", path: "/admin/totalorder" },
      {
        name: "Order View",
        path: `/admin/totalorder/${id}`,
        disabled: true,
      },
    ],
    "/admin/totalpending": [
      { name: "Dashboard", path: "/admin" },
      { name: "Pending Orders", path: "/admin/totalpending" },
    ],
    "/admin/totalpending/[id]": (id: string) => [
      { name: "Dashboard", path: "/admin" },
      { name: "Pending Order", path: "/admin/totalpending" },
      {
        name: "Order View",
        path: `/admin/totalpending/${id}`,
        disabled: true,
      },
    ],
    "/admin/banner": [
      { name: "Dashboard", path: "/admin" },
      { name: "Banner", path: "/admin/banner" },
    ],
  };

  const dynamicMatch = currentPath.match(
    /\/(user|admin)\/(order|delivery|totalorder|totalpending|banner|product(?:\/view)?)\/([a-f0-9-]+)/
  );
  const dynamicId = dynamicMatch ? dynamicMatch[3] : null;

  let items: BreadcrumbItemType[] = [];

  if (dynamicId && dynamicMatch) {
    const baseRoute = `/${dynamicMatch[1]}/${dynamicMatch[2]}/[id]`;
    const dynamicBreadcrumbFunc = breadcrumbItems[baseRoute] as (
      id: string
    ) => BreadcrumbItemType[];
    items = dynamicBreadcrumbFunc(dynamicId);
  } else {
    items = (breadcrumbItems[currentPath] as BreadcrumbItemType[]) || [];
  }

  // const dynamicIdMatch = currentPath.match(
  //   /\/(user|admin)\/(order|delivery|product\/view)\/([a-f0-9-]+)/
  // );
  // const dynamicId = dynamicIdMatch ? dynamicIdMatch[3] : null;

  // let items: BreadcrumbItemType[] = [];

  // if (dynamicId) {
  //   //@ts-ignore
  //   const route = dynamicIdMatch[1];
  //   const dynamicBreadcrumbFunc = breadcrumbItems[`/user/${route}/[id]`] as (
  //     id: string
  //   ) => BreadcrumbItemType[];
  //   items = dynamicBreadcrumbFunc(dynamicId);
  // } else {
  //   items = (breadcrumbItems[currentPath] as BreadcrumbItemType[]) || [];
  // }

  return (
    <NextUIBreadcrumbs className="bg-gray-100 px-6 py-2">
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          <Link
            href={item.disabled ? "#" : item.path}
            className={`text-slate-800 hover:underline ${
              item.disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {item.name}
          </Link>
        </BreadcrumbItem>
      ))}
    </NextUIBreadcrumbs>
  );
};

export default BreadcrumbHeader;
