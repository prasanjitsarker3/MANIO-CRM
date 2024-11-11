/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteOrder from "@/components/ModaretorDashboardComponent/OrderMangement/DeleteOrder";
import { useGetAllOrderForAdminQuery } from "@/components/Redux/OrderApi/orderApi";
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "CONTACT", uid: "contact" },
  { name: "AMOUNT", uid: "totalPrice" },
  { name: "PRODUCT", uid: "deliveryCharge" },
  { name: "STATUS", uid: "status" },
  { name: "DATE", uid: "createAt" },
  { name: "ACTIONS", uid: "actions" },
];

const TotalOrderPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const query: Record<string, any> = {
    searchTerm,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllOrderForAdminQuery(query);
  if (isLoading) {
    <div className=" w-full flex justify-center items-center pt-8">
      <Spinner />
    </div>;
  }

  const renderCell = React.useCallback(
    (orderData: any, columnKey: React.Key) => {
      const cellValue = orderData[columnKey as any];

      switch (columnKey) {
        case "name":
          return (
            <p className="text-bold text-lg capitalize primaryColor">
              {orderData?.name}
            </p>
          );
        case "contact":
          return (
            <p className="text-bold text-lg capitalize primaryColor">
              {orderData?.contact}
            </p>
          );
        case "totalPrice":
          return (
            <p className="text-bold text-lg capitalize primaryColor">
              {orderData?.totalPrice}
            </p>
          );

        case "deliveryCharge":
          return (
            <p className="text-bold text-lg capitalize primaryColor">
              {orderData?.orderItems.length || 0}
            </p>
          );
        case "status":
          return (
            <p className="text-bold text-lg capitalize primaryColor">
              {orderData?.status}
            </p>
          );
        case "createAt":
          return (
            <h3 className="text-lg text-gray-500 ">
              {new Date(orderData?.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h3>
          );
        case "actions":
          return (
            <div className=" w-full relative flex justify-center items-center gap-2">
              <Tooltip content="View Product">
                <Link href={`/admin/totalorder/${orderData?.id}`}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Link>
              </Tooltip>
              <DeleteOrder orderId={orderData?.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const orderData = data?.data?.data || [];
  const metaData = data?.data?.meta;
  const total = metaData?.total || 0;
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className=" bg-white p-10">
      <div className="relative">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          placeholder="Searching..."
          className="pl-10 pr-4 py-2 w-full md:w-52 border border-gray-200 bg-white focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-500" size={20} />
        </div>
      </div>
      <div>
        <div className=" pt-6 overflow-x-auto">
          <Table
            isStriped
            removeWrapper
            aria-label="Example table with custom cells"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={orderData}>
              {(item) => (
                //@ts-ignore
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className=" flex justify-center py-3">
            <Pagination
              total={countPage}
              page={page}
              showControls
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalOrderPage;
