/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteViewOrder from "@/components/ModaretorDashboardComponent/OrderMangement/DeleteViewOrder";
import OrderUpdateStatus from "@/components/ModaretorDashboardComponent/OrderMangement/OrderUpdateStatus";
import {
  useDiscountAndDeliveryFromDBMutation,
  useGetSingleOrderViewQuery,
  usePdfDownloadFromDBMutation,
} from "@/components/Redux/OrderApi/orderApi";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { FileText } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { usePDF } from "react-to-pdf";
import { toast } from "sonner";

interface OrderProps {
  params: {
    orderId: string;
  };
}
const ViewOrderPage: React.FC<OrderProps> = ({ params }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const orderId = params.orderId;
  const { data, isLoading } = useGetSingleOrderViewQuery(orderId);
  const [updateDiscountAndDevlivery] = useDiscountAndDeliveryFromDBMutation();

  const [pdfDownloadFromDB, { isLoading: pdfDownloading }] =
    usePdfDownloadFromDBMutation();

  if (isLoading) {
    <h1 className=" w-full flex justify-center items-center pt-3">
      <Spinner />
    </h1>;
  }
  const orderData = data?.data;
  const { toPDF, targetRef } = usePDF({
    filename: orderData?.name
      ? `${orderData.name}_Order_Details.pdf`
      : "Order_Details.pdf",
  });

  const handlePdfDownload = async () => {
    const toastId = toast.loading("Downloading...");
    try {
      const res = await pdfDownloadFromDB(orderId);
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
        toPDF();
      } else {
        toast.error(res?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      delivery: orderData?.deliveryCharge,
      discount: 0,
    },
  });

  const onSubmit = async (data: any) => {
    const orderNowData = {
      id: orderId,
      delivery: data?.delivery,
      discount: data?.discount,
    };
    try {
      const updateRes = await updateDiscountAndDevlivery(orderNowData);
      if (updateRes?.data?.statusCode === 200) {
        reset();
        onClose();
        toast.success("Update Successfully !");
      }
    } catch (err) {
      console.log("Err", err);
    }
  };

  console.log("orderData", orderData);

  return (
    <div className=" bg-white ">
      <div ref={targetRef} className="p-10">
        <div className=" w-full mx-auto pt-16">
          <Image
            src={"/manio-logo.png"}
            alt=""
            width={100}
            height={100}
            className=" mx-auto flex justify-center items-center"
          />
        </div>
        <div className=" pt-6 pb-2">
          <h1 className=" text-lg md:text-4xl font-medium text-center text-slate-700 uppercase">
            Invoice{" "}
          </h1>
        </div>
        <div className=" border border-b border-gray-100 mb-4"></div>
        {orderData ? (
          <div className="space-y-4">
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-20">
              <div className="text-base text-slate-800">
                <h1 className=" text-lg font-medium primaryColor pb-2 ">
                  FORM
                </h1>
                <h1>MANIOBD.COM</h1>
                <h1>Badda-23/24</h1>
                <h1>Dhaka-Bangladesh</h1>
              </div>

              <div className="text-base text-slate-800 capitalize">
                <h1 className="text-lg font-medium primaryColor pb-2">
                  BILL TO
                </h1>
                <h1>{orderData?.name}</h1>
                <h1>{orderData?.contact}</h1>
                <h1>{orderData?.address}</h1>
              </div>
              <div className="text-base text-slate-800 capitalize">
                <h1 className="text-lg font-medium primaryColor pb-2">
                  SHIP TO
                </h1>
                <h1>{orderData?.name}</h1>
                <h1>{orderData?.contact}</h1>
                <h1>{orderData?.address}</h1>
              </div>
            </div>
            <div className=" border border-gray-100 w-full"></div>
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-20">
              <div className=" text-slate-800">
                <h1 className=" primaryColor font-medium">INVOICE A</h1>
                <h1>MAN- ({orderData?.id?.slice(0, 6)})</h1>
              </div>

              <div className=" text-slate-800">
                <h1 className=" primaryColor font-medium">INVOICE DATE</h1>
                <h1>
                  {new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </h1>
              </div>

              <div className=" text-slate-800">
                <h1 className=" primaryColor font-medium">ORDER DATE</h1>
                <h1>
                  {new Date(orderData?.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </h1>
              </div>
            </div>
            {orderData.orderItems && orderData.orderItems.length > 0 ? (
              <div className=" overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-100 ">
                  <thead>
                    <tr className="bg-gray-200 text-left primaryColor">
                      <th className="py-2 px-4  w-1/5">Description</th>
                      <th className="py-2 px-4  w-1/5">Quantity</th>
                      <th className="py-2 px-4  w-1/5">Size</th>
                      <th className="py-2 px-4  w-1/5">Unique Price</th>
                      <th className="py-2 px-4  w-1/5">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.orderItems.map((item: any, index: number) => (
                      <tr
                        key={item.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-white"
                        } border-b`}
                      >
                        <td className="py-2 px-4 bg-white">
                          {item.product.name}
                        </td>
                        <td className="py-2 px-4 bg-white">{item.quantity}</td>
                        <td className="py-2 px-4 bg-white">
                          {item.size.join(", ")}
                        </td>
                        <td className="py-2 px-4 bg-white">
                          {item.product.price.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 bg-white">
                          {item.product.price.toFixed(2) * item.quantity}
                        </td>
                      </tr>
                    ))}

                    {/* Subtotal Row Added */}

                    <tr className=" text-left font-semibold">
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100" colSpan={1}>
                        {" "}
                        Sub Total
                      </td>
                      <td className="py-1 px-4 bg-gray-100">
                        {/* Calculate subtotal */}
                        Tk-{" "}
                        {orderData.orderItems
                          ?.reduce(
                            (subtotal: number, item: any) =>
                              subtotal +
                              parseFloat(item.product.price) *
                                parseInt(item.quantity),
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>
                    <tr className=" text-left font-semibold">
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100" colSpan={1}>
                        {" "}
                        Delivery Charge:
                      </td>
                      <td className="py-1 px-4 bg-gray-100">
                        Tk- {parseInt(orderData?.deliveryCharge)}
                      </td>
                    </tr>

                    <tr className=" text-left font-semibold">
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100" colSpan={1}>
                        {" "}
                        Discount :
                      </td>
                      <td className="py-1 px-4 bg-gray-100">
                        Tk- {orderData?.discountNow}
                      </td>
                    </tr>

                    <tr className=" text-left font-semibold">
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100"></td>
                      <td className="py-1 px-4 bg-gray-100" colSpan={1}>
                        Total
                      </td>
                      <td className="py-1 px-4 bg-gray-100">
                        Tk- {parseInt(orderData.totalPrice).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No order items found.</p>
            )}
          </div>
        ) : (
          <p>Order not found.</p>
        )}
      </div>

      <div className=" w-full py-10 flex flex-col md:flex-row justify-center items-center mx-auto gap-12">
        <DeleteViewOrder orderId={orderId} />
        {orderData?.isPdf === false ? (
          <Button
            isDisabled={pdfDownloading}
            onClick={handlePdfDownload}
            className=" flex items-center gap-3 px-8 font-bold bg-gray-200 primaryColor rounded-none"
          >
            {" "}
            <FileText /> PDF Download
          </Button>
        ) : (
          <Button
            isDisabled={true}
            className=" flex items-center gap-3 px-8 font-bold bg-gray-200 primaryColor rounded-none"
          >
            {" "}
            <FileText /> Already Download
          </Button>
        )}

        <OrderUpdateStatus orderId={orderId} />

        <Button
          onClick={onOpen}
          className=" font-bold bg-gray-200 primaryColor px-8 py-2 rounded-none"
        >
          Voice Edit
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
              Update Voice
            </ModalHeader>
            <ModalBody>
              <Input
                size="lg"
                defaultValue={orderData?.deliveryCharge || ""}
                placeholder="Delivery"
                {...register("delivery")}
                className="mb-4"
              />

              <Input
                size="lg"
                type="number"
                //@ts-ignore
                defaultValue={0}
                placeholder="Discount"
                {...register("discount")}
                className="mb-4"
              />
            </ModalBody>

            <ModalFooter className="w-full items-center">
              <Button
                size="sm"
                className="bg-[#0c9ecf] text-white w-full"
                type="submit"
              >
                Voice Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ViewOrderPage;
