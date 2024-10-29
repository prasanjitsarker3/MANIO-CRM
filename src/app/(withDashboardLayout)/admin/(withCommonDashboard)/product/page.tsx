/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteProductModal from "@/components/AdminDashboardRoute/ProductManegament/DeleteProudctModal";
import { useGetAllCategoryQuery } from "@/components/Redux/CategoryApi/categoryApi";
import { useGetAllProductQuery } from "@/components/Redux/ProductApi/productApi";
import {
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const columns = [
  { name: "PHOTO", uid: "img" },
  { name: "NAME", uid: "name" },
  { name: "CATEGORY", uid: "categoryId" },
  { name: "TYPE", uid: "type" },
  { name: "PRICE", uid: "price" },
  { name: "STOCK", uid: "totalProduct" },
  { name: "SOLD", uid: "sold" },
  { name: "ACTIONS", uid: "actions" },
];

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setCategoryId("");
    }
  }, [searchTerm]);

  const query: Record<string, any> = {
    searchTerm,
    page,
    limit,
  };
  if (!searchTerm.length) {
    if (categoryId) query["categoryId"] = categoryId;
  }

  const { data, isLoading } = useGetAllProductQuery(query);
  const { data: categoryData, isLoading: categoryLoad } =
    useGetAllCategoryQuery({});

  if (isLoading || categoryLoad) {
    <div className=" w-full flex justify-center items-center pt-24">
      <Spinner size="lg" className=" primaryColor" />
    </div>;
  }

  const renderCell = React.useCallback(
    (productData: any, columnKey: React.Key) => {
      const cellValue = productData[columnKey as any];

      switch (columnKey) {
        case "img":
          return (
            <div>
              <div className=" w-16 h-16   ">
                <Image
                  src={
                    productData?.photo[0].img ||
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
                {productData?.name}
              </p>
            </div>
          );
        case "categoryId":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize text-slate-800">
                {productData?.category?.name}
              </p>
            </div>
          );
        case "type":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize text-slate-800">
                {productData?.type}
              </p>
            </div>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize text-slate-800">
                {parseFloat(productData?.price).toFixed(2)}
              </p>
            </div>
          );
        case "totalProduct":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize text-slate-800">
                {productData?.totalProduct}
              </p>
            </div>
          );
        case "sold":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize text-slate-800">
                {productData?.sold}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className=" w-full relative flex justify-center items-center gap-2">
              <Tooltip content="View Product">
                <Link href={`/admin/product/view/${productData.id}`}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Link>
              </Tooltip>
              <Tooltip content="Update Product">
                <Link href={`/admin/product/${productData?.id}`}>
                  {" "}
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Link>
              </Tooltip>
              <DeleteProductModal orderId={productData?.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const productData = data?.data?.data || [];
  const metaData = data?.data?.meta;
  const total = metaData?.total || 0;
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const categoryFilterData = categoryData?.data?.data || [];
  return (
    <div className=" bg-white p-10">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Link href={"/admin/product/create"}>
          <button className=" bg-[#0c9ecf]  w-60 md:w-full text-white py-2 px-4 flex items-center gap-2 rounded-md">
            <Plus />
            Add New Product
          </button>
        </Link>
        <div className="relative w-64 ml-2 md:ml-0">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Searching..."
            className="pl-10 pr-4 py-2  w-60 md:w-full border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
        </div>
        <Select
          size="sm"
          label="Filter By Category"
          className=" w-60"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <SelectItem value="" key="">
            All Product
          </SelectItem>
          {categoryFilterData.map((item: any) => (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className=" pt-6">
        <div className="overflow-x-auto">
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
            <TableBody items={productData}>
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
    </div>
  );
};

export default ProductPage;
