/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CreateBanner from "@/components/AdminDashboardRoute/BannerManagement/CreateBanner";
import DeleteBanner from "@/components/AdminDashboardRoute/BannerManagement/DeleteBanner";
import { useGetAllBannerQuery } from "@/components/Redux/CategoryApi/categoryApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { EyeIcon, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const columns = [
  { name: "PROFILE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "CREATE DATE", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

const BannerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectData, setSelectData] = useState<any>(null);

  const query: Record<string, any> = {
    searchTerm,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllBannerQuery(query);
  if (isLoading) {
    <div className=" w-full flex justify-center items-center pt-24">
      <Spinner size="lg" className=" primaryColor" />
    </div>;
  }

  const renderCell = React.useCallback(
    (bannerData: any, columnKey: React.Key) => {
      const cellValue = bannerData[columnKey as any];

      switch (columnKey) {
        case "image":
          return (
            <div>
              <div className=" w-12 h-12">
                <Image
                  src={
                    bannerData?.img ||
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
                {bannerData?.name}
              </p>
            </div>
          );

        case "createdAt":
          return (
            <div className="flex flex-col">
              <h3 className="text-lg text-gray-500 ">
                {new Date(bannerData?.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h3>
            </div>
          );

        case "actions":
          return (
            <div className=" w-full relative flex justify-center items-center gap-2">
              <Tooltip content="View">
                <span
                  onClick={() => {
                    setSelectData(bannerData);
                    onOpen();
                  }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <DeleteBanner bannerId={bannerData?.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const bannerData = data?.data?.data || [];
  const metaData = data?.data?.meta;
  const total = metaData?.total || 0;
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className=" bg-white p-10">
      <div className=" flex items-center gap-3">
        <CreateBanner />
        <div className="relative">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Searching..."
            className="pl-10 pr-4 py-2 rounded-none w-full md:w-48 border border-gray-200 bg-white focus:outline-none focus:border-blue-500"
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
          <TableBody items={bannerData}>
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
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
            Banner Photo
          </ModalHeader>
          <ModalBody>
            <Image
              src={
                selectData?.img ||
                "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid"
              }
              alt=""
              height={300}
              width={300}
              className="h-full w-full"
            />
          </ModalBody>
          <ModalFooter className=" w-full items-center">
            <Button
              size="sm"
              isDisabled={isLoading}
              className="bg-[#F31260] text-white w-full"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BannerPage;
