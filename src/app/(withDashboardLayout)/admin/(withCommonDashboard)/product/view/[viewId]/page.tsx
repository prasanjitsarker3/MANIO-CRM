/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetSingleProductQuery } from "@/components/Redux/ProductApi/productApi";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

interface ProductProps {
  params: {
    viewId: string;
  };
}

const ViewProduct: React.FC<ProductProps> = ({ params }) => {
  const viewId = params.viewId;
  const { data, isLoading } = useGetSingleProductQuery(viewId);

  if (isLoading) {
    return (
      <div className=" w-full flex justify-center items-center pt-24">
        <Spinner size="lg" className=" primaryColor" />
      </div>
    );
  }

  const productData = data?.data;

  if (!productData) {
    return <h1>No product data found</h1>;
  }

  return (
    <div className="p-10 bg-white">
      <h1 className="text-xl font-bold primaryColor">
        Product View Information
      </h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
        <div className=" text-base md:text-lg space-y-2">
          <h2 className=" bg-gray-100 text-slate-800 py-2 px-4">
            Name: {productData.name}
          </h2>
          <p className=" bg-gray-100 text-slate-800 py-2 px-4">
            Category: {productData.category?.name}
          </p>
          <p className=" bg-gray-100 text-slate-800 py-2 px-4">
            Type: {productData.type}
          </p>
          <p className=" bg-gray-100 text-slate-800 py-2 px-4">
            Price:Tk- {productData.price}
          </p>
        </div>
        <div className="text-base md:text-lg space-y-2">
          <p className=" bg-gray-100 text-slate-800 py-2 px-4">
            Discount: {productData.discount}%
          </p>
          <p className=" bg-gray-100 text-slate-800 py-2 px-4">
            Total in Stock: {productData.totalProduct}
          </p>
          <p className=" bg-gray-100 text-slate-800 py-2 px-4">
            Sold: {productData.sold}
          </p>
          <p className=" bg-gray-100 text-slate-800 py-2 px-4">
            Available Sizes: {productData.size.join(", ")}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium primaryColor">Photos:</h3>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            {productData.photo?.map((photo: any) => (
              <Image
                key={photo.id}
                src={photo.img}
                alt={productData.name}
                width={300}
                height={300}
                className="border rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
