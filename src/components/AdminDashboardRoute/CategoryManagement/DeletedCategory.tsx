/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDeleteCategoryMutation } from "@/components/Redux/CategoryApi/categoryApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const DeletedCategory = ({ orderId }: { orderId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteCategory, { isLoading }] = useGetDeleteCategoryMutation();

  const handleDeleteOrder = async () => {
    const toastId = toast.loading("Processing...");
    try {
      const res = await deleteCategory(orderId);
      console.log(res);
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
        onClose();
      } else {
        toast.error(res?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };
  return (
    <div>
      <Tooltip color="danger" content="Delete Product">
        <span
          onClick={onOpen}
          className="text-lg text-danger cursor-pointer active:opacity-50"
        >
          <Trash />
        </span>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalBody>
            <div className=" py-8 space-y-3">
              <div className=" w-12 h-12 mx-auto rounded-full border border-gray-200 flex justify-center items-center">
                <Trash className=" text-red-600" />
              </div>
              <h1 className=" font-semibold text-slate-800 text-lg text-center">
                Confirm Deletion ?
              </h1>
            </div>
          </ModalBody>

          <ModalFooter className="w-full items-center">
            <Button
              isDisabled={isLoading}
              onClick={handleDeleteOrder}
              size="sm"
              className="bg-[#0c9ecf] text-white font-bold w-full"
            >
              Deleted
            </Button>
            <Button
              size="sm"
              className=" bg-red-600 text-white font-bold w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeletedCategory;
