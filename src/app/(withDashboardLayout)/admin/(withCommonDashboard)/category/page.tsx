/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AddNewCategory from "@/components/AdminDashboardRoute/CategoryManagement/AddNewCategory";
import DeletedCategory from "@/components/AdminDashboardRoute/CategoryManagement/DeletedCategory";
import {
  useGetAllCategoryQuery,
  useToggleCategoryMutation,
} from "@/components/Redux/CategoryApi/categoryApi";
import {
  Pagination,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const columns = [
  { name: "PROFILE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "FEATURE", uid: "isFeature" },
  { name: "CREATE DATE", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleCategory] = useToggleCategoryMutation();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const query: Record<string, any> = {
    searchTerm,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllCategoryQuery(query);
  if (isLoading) {
    <div className=" w-full flex justify-center items-center pt-24">
      <Spinner size="lg" className=" primaryColor" />
    </div>;
  }

  const handleToggleFeature = React.useCallback(
    async (id: string) => {
      const res = await toggleCategory(id);
      if (res?.data?.statusCode === 200) {
        toast.success("Update Successfully !");
      }
    },
    [toggleCategory]
  );

  const renderCell = React.useCallback(
    (categoryData: any, columnKey: React.Key) => {
      const cellValue = categoryData[columnKey as any];

      switch (columnKey) {
        case "image":
          return (
            <div>
              <div className=" w-12 h-12">
                <Image
                  src={
                    categoryData?.img ||
                    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid"
                  }
                  alt=""
                  height={80}
                  width={80}
                  className=" h-full w-full rounded-full border-2 border-[#0c9ecf]"
                />
              </div>
            </div>
          );
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize primaryColor">
                {categoryData?.name}
              </p>
            </div>
          );
        case "isFeature":
          return (
            <p className="text-bold text-lg capitalize primaryColor">
              {categoryData?.isFeature ? "Feature" : "Normal"}
            </p>
          );

        case "createdAt":
          return (
            <div className="flex flex-col">
              <h3 className="text-lg text-gray-500 ">
                {new Date(categoryData?.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h3>
            </div>
          );

        case "actions":
          return (
            <div className=" w-full flex justify-center items-center gap-2">
              <Switch
                onClick={() => handleToggleFeature(categoryData?.id)}
                size="sm"
                isSelected={categoryData?.isFeature || false}
                aria-label="Automatic updates"
              />
              <DeletedCategory orderId={categoryData?.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleToggleFeature]
  );

  const categoryData = data?.data?.data || [];
  const metaData = data?.data?.meta;
  const total = metaData?.total || 0;
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className=" bg-white p-10">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="">
          <AddNewCategory />
        </div>
        <div className="relative">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Searching..."
            className="pl-10 pr-4 py-2  rounded-none w-full md:w-48 border border-gray-200 bg-white focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      <div className=" pt-6 overflow-x-auto">
        <Table
          isStriped
          removeWrapper
          aria-label="Example table with custom cells"
          className="border border-[#F4F4F5] rounded-lg"
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
          <TableBody items={categoryData}>
            {(item) => (
              //@ts-ignore
              <TableRow key={item.id} className="hover:bg-[#e7f5fa]">
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
  );
};

export default CategoryPage;
