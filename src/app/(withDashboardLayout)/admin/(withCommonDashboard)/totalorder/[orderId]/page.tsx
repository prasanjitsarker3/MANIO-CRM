/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteViewOrder from "@/components/ModaretorDashboardComponent/OrderMangement/DeleteViewOrder";
import OrderUpdateStatus from "@/components/ModaretorDashboardComponent/OrderMangement/OrderUpdateStatus";
import { useGetSingleOrderViewQuery } from "@/components/Redux/OrderApi/orderApi";
import { Button, Spinner } from "@nextui-org/react";
import { FileText } from "lucide-react";
import Image from "next/image";
import React from "react";

interface OrderProps {
  params: {
    orderId: string;
  };
}
const ViewOrderPage: React.FC<OrderProps> = ({ params }) => {
  const orderId = params.orderId;
  const { data, isLoading } = useGetSingleOrderViewQuery(orderId);
  if (isLoading) {
    <div className=" w-full flex justify-center items-center pt-8">
      <Spinner />
    </div>;
  }
  const orderData = data?.data;

  return (
    <div className=" bg-white p-10">
      <h1 className="text-xl font-bold mb-4 primaryColor">Order Details</h1>
      {orderData ? (
        <div className="space-y-4">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className=" space-y-3">
              <h1 className=" px-4 py-2 bg-gray-100 text-slate-800 text-base">
                <span className=" font-medium">Name: </span> {orderData?.name}
              </h1>
              <h1 className=" px-4 py-2 bg-gray-100 text-slate-800 text-base">
                <span className=" font-medium">Contact: </span>{" "}
                {orderData?.contact}
              </h1>
              <h1 className=" px-4 py-2 bg-gray-100 text-slate-800 text-base">
                <span className=" font-medium">Address: </span>{" "}
                {orderData?.address}
              </h1>
              <h1 className=" px-4 py-2 bg-gray-100 text-slate-800 text-base">
                <span className=" font-medium">Status: </span>{" "}
                {orderData?.status}
              </h1>
            </div>
            <div className=" space-y-3">
              <h1 className=" px-4 py-2 bg-gray-100 text-slate-800 text-base">
                <span className=" font-medium">Total Amount: </span>{" "}
                {orderData?.totalPrice}
              </h1>
              <h1 className=" px-4 py-2 bg-gray-100 text-slate-800 text-base">
                <span className=" font-medium">Delivery Tk: </span>{" "}
                {orderData?.deliveryCharge}
              </h1>
              <h1 className=" px-4 py-2 bg-gray-100 text-slate-800 text-base">
                <span className=" font-medium">Order Date: </span>{" "}
                {new Date(orderData?.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h1>
              <h1 className=" px-4 py-2 bg-gray-100 text-slate-800 text-base">
                <span className=" font-medium">Order ID: </span> {orderData?.id}
              </h1>
            </div>
          </div>
          {orderData.orderItems && orderData.orderItems.length > 0 ? (
            <table className="min-w-full table-auto bg-gray-100">
              <thead>
                <tr className="bg-gray-200 text-left primaryColor">
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Size</th>
                  <th className="py-2 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderData.orderItems.map((item: any, index: number) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } border-b`}
                  >
                    <td className="py-2 px-4">
                      <Image
                        src={item.product.photo[0].img}
                        alt={item.product.name}
                        width={60}
                        height={60}
                        className="h-16 w-16 object-cover"
                      />
                    </td>
                    <td className="py-2 px-4">{item.product.name}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">{item.size.join(", ")}</td>
                    <td className="py-2 px-4">
                      Tk- {(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No order items found.</p>
          )}
        </div>
      ) : (
        <p>Order not found.</p>
      )}

      <div className=" w-full pt-10 flex justify-center items-center mx-auto gap-12">
        <DeleteViewOrder orderId={orderId} />
        <Button className=" flex items-center gap-3 px-8 font-bold bg-gray-200 primaryColor rounded-none">
          {" "}
          <FileText /> PDF Download
        </Button>
        <OrderUpdateStatus orderId={orderId} />
      </div>
    </div>
  );
};

export default ViewOrderPage;
