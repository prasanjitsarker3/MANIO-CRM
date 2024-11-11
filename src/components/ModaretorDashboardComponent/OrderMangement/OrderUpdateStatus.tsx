/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useOrderStatusUpdateMutation } from "@/components/Redux/OrderApi/orderApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Edit } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const OrderUpdateStatus = ({ orderId }: { orderId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderUpdateStatus, { isLoading }] = useOrderStatusUpdateMutation();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Updating...");
    try {
      const res = await orderUpdateStatus({
        id: orderId,
        updateData: { status: data.status },
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

  return (
    <div>
      <Button
        onClick={onOpen}
        className="w-full md:w-60 bg-[#0c9ecf] text-white flex items-center gap-2 rounded-none px-6 "
      >
        {" "}
        Order Update <Edit size={20} />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
              Update Order Status
            </ModalHeader>
            <ModalBody>
              <Select
                size="sm"
                label="Select Status"
                className="w-full"
                {...register("status")}
              >
                <SelectItem key={"CONFIFM"} value={"CONFIFM"}>
                  CONFIRM
                </SelectItem>
                <SelectItem key={"DELIVERY"} value={"DELIVERY"}>
                  DELIVERY
                </SelectItem>
                <SelectItem key={"REJECTED"} value={"REJECTED"}>
                  REJECTED
                </SelectItem>
              </Select>
            </ModalBody>

            <ModalFooter className="w-full items-center pt-6 pb-10">
              <Button
                size="sm"
                className="bg-[#F31260] text-white w-full"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                isDisabled={isLoading}
                size="sm"
                className="bg-[#0c9ecf] text-white w-full"
                type="submit"
              >
                Update Status
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderUpdateStatus;
