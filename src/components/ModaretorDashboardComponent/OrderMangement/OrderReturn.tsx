/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOrderStatusUpdateMutation } from "@/components/Redux/OrderApi/orderApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { CornerDownLeft } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const OrderReturn = ({ orderId }: { orderId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderUpdateStatus, { isLoading }] = useOrderStatusUpdateMutation();

  const handleDeleteOrder = async () => {
    const toastId = toast.loading("Processing...");
    try {
      const res = await orderUpdateStatus({
        id: orderId,
        updateData: { status: "RETURN" },
      });

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
      <button
        onClick={onOpen}
        className=" w-full md:w-60 px-8 py-2 bg-[#0c9ecf] text-white flex justify-center items-center gap-3"
      >
        <CornerDownLeft /> RETURN
      </button>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalBody>
            <div className=" py-8 space-y-3">
              <div className=" w-12 h-12 mx-auto rounded-full border border-gray-200 flex justify-center items-center">
                <CornerDownLeft className=" text-red-600" />
              </div>
              <h1 className=" font-semibold text-slate-800 text-lg text-center">
                Are You Sure? Return !
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
              onClick={handleDeleteOrder}
              size="sm"
              className="bg-[#0c9ecf] text-white w-full"
            >
              Return
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderReturn;
