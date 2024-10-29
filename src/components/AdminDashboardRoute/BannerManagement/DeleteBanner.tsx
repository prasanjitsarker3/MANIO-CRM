/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteBannerMutation } from "@/components/Redux/CategoryApi/categoryApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Trash, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const DeleteBanner = ({ bannerId }: { bannerId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteBanner, { isLoading }] = useDeleteBannerMutation();

  const handleDeleteBanner = async () => {
    const toastId = toast.loading("Processing...");
    try {
      const res = await deleteBanner(bannerId);
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
                  <X className=" text-red-600" />
                </div>
                <h1 className=" font-semibold text-slate-800 text-lg text-center">
                  Are You Sure? Delete !
                </h1>
              </div>
            </ModalBody>

            <ModalFooter className="w-full items-center">
              <Button
                size="sm"
                className="bg-[#F31260] text-white w-full"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                isDisabled={isLoading}
                onClick={handleDeleteBanner}
                size="sm"
                className="bg-[#0c9ecf] text-white w-full"
              >
                Deleted
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteBanner;
