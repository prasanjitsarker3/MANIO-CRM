/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CreateUser from "@/components/AdminDashboardRoute/UserManagement/CreateUser";
import DeleteUser from "@/components/AdminDashboardRoute/UserManagement/DeleteUser";
import {
  useGetAllUserQuery,
  useGetUserStatusUpdateMutation,
} from "@/components/Redux/UserApi/userApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
  useDisclosure,
} from "@nextui-org/react";
import { Edit, Search } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "DATE", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

const UserManagement = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const query: Record<string, any> = {
    searchTerm,
    page,
    limit,
  };
  const { data, isLoading } = useGetAllUserQuery(query);
  const [updateStatus, { isLoading: updating }] =
    useGetUserStatusUpdateMutation();
  if (isLoading) {
    <div className=" w-full flex justify-center items-center pt-24">
      <Spinner size="lg" className=" primaryColor" />
    </div>;
  }
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500 text-white";
      case "BLOCKED":
        return "bg-yellow-400 text-white";
      case "DELETED":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (formData: any) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = await updateStatus({
        id: selectedUserId,
        updateData: formData,
      });
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
        reset();
        onClose();
      } else {
        toast.error(res?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  const renderCell = React.useCallback(
    (userData: any, columnKey: React.Key) => {
      const cellValue = userData[columnKey as any];

      switch (columnKey) {
        case "name":
          return (
            <p className="text-bold text-lg capitalize text-slate-800">
              {userData?.name}
            </p>
          );
        case "email":
          return (
            <p className="text-bold text-lg   text-slate-800">
              {userData?.email}
            </p>
          );
        case "role":
          return (
            <p className="text-bold text-lg primaryColor uppercase">
              {userData?.role}
            </p>
          );
        case "status":
          return (
            <Button
              size="sm"
              className={`text-bold w-32 text-base capitalize px-4 py-2 rounded-md ${getStatusClasses(
                userData?.status
              )}`}
            >
              {userData?.status?.toLowerCase()}
            </Button>
          );

        case "createdAt":
          return (
            <div className="flex flex-col">
              <h3 className="text-lg text-gray-500 ">
                {new Date(userData?.createdAt).toLocaleDateString("en-GB", {
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
              <Tooltip color="primary" content="Update Status">
                <span
                  onClick={() => {
                    setSelectedUserId(userData?.id);
                    onOpen();
                  }}
                  className="text-lg text-blue-500 cursor-pointer active:opacity-50"
                >
                  <Edit />
                </span>
              </Tooltip>

              <DeleteUser orderId={userData?.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onOpen]
    // Added onOpen In Here
  );

  const userData = data?.data?.data || [];
  const metaData = data?.data?.meta;
  const total = metaData?.total || 0;
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className=" bg-white p-10">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <CreateUser />
        <div className="relative ">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Searching..."
            className="pl-10 pr-4 py-2 w-52 border border-gray-200 bg-white  focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
        </div>
      </div>
      <div className=" pt-6  overflow-x-auto">
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
          <TableBody items={userData}>
            {(item) => (
              //@ts-ignore
              <TableRow
                //@ts-ignore
                key={item.id || item.email}
                className="hover:bg-[#e7f5fa]"
              >
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
              Update Status
            </ModalHeader>
            <ModalBody>
              <Select
                size="sm"
                label="Select Category"
                className="w-full"
                {...register("status")}
              >
                <SelectItem key={"ACTIVE"} value={"ACTIVE"}>
                  ACTIVE
                </SelectItem>
                <SelectItem key={"BLOCKED"} value={"BLOCKED"}>
                  BLOCKED
                </SelectItem>
                <SelectItem key={"DELETED"} value={"DELETED"}>
                  DELETED
                </SelectItem>
              </Select>
            </ModalBody>

            <ModalFooter className="w-full items-center">
              <Button
                size="sm"
                className="bg-[#F31260] text-white w-full"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                isDisabled={updating}
                size="sm"
                className="bg-[#0c9ecf] text-white w-full"
                type="submit"
              >
                Status Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserManagement;
