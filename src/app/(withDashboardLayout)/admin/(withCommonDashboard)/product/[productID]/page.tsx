/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import {
  useGetSingleProductQuery,
  useGetSingleProductUpdateMutation,
} from "@/components/Redux/ProductApi/productApi";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sizeData } from "@/components/Utlities/productsContants";

interface ProductProps {
  params: {
    productID: string;
  };
}

interface Photo {
  id: string;
  img: string;
}

type FormValues = {
  name: string;
  price: number | string;
  discount: number | string;
  totalProduct: number | string;
  size: string[];
  type: "Man" | "Woman";
  images: File[];
};

const ProductUpdatePage: React.FC<ProductProps> = ({ params }) => {
  const productId = params.productID;
  const { data, isLoading } = useGetSingleProductQuery(productId);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const router = useRouter();

  const [updateProduct, { isLoading: updateing }] =
    useGetSingleProductUpdateMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  useEffect(() => {
    if (data?.data) {
      const { name, price, discount, totalProduct, size, photo } = data.data;
      setValue("name", name);
      setValue("price", price);
      setValue("discount", discount);
      setValue("totalProduct", totalProduct);
      setValue("size", size || []);
      setPhotos(photo || []);
    }
  }, [data, setValue]);

  if (isLoading) {
    return (
      <div className=" w-full flex justify-center items-center pt-24">
        <Spinner size="lg" className=" primaryColor" />
      </div>
    );
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newPhotos = filesArray.map((file) => ({
        id: Date.now().toString() + file.name,
        img: URL.createObjectURL(file),
      }));
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (id: string) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => !id.includes(image.name))
    );
  };

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Updating...");
    const updateData = {
      name: data.name,
      size: data.size,
      price: parseFloat(data.price.toString()),
      discount: parseFloat(data.discount.toString()),
      totalProduct: parseInt(data.totalProduct.toString(), 10),
      oldImg: photos,
      id: productId,
    };

    const submitData = new FormData();
    submitData.append("data", JSON.stringify(updateData));
    selectedImages.forEach((file: File) => {
      submitData.append("file", file);
    });

    try {
      const res = await updateProduct(submitData);
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
      } else {
        toast.error(res?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };
  return (
    <div className="bg-white p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="mt-1 block w-full px-3 py-3 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              {...register("price")}
              className="mt-1 block w-full px-3 py-3 bg-gray-100  border border-gray-100 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount (%)
            </label>
            <input
              type="number"
              id="discount"
              {...register("discount")}
              className="mt-1 block w-full px-3 py-3 bg-gray-100  border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image Upload */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="my-3 w-full bg-gray-100 py-2 px-4 cursor-pointer"
            />
          </div>

          {/* Total Products */}
          <div className=" mt-2">
            <label
              htmlFor="totalProduct"
              className="block text-sm font-medium text-gray-700"
            >
              Total Products
            </label>
            <input
              type="number"
              id="totalProduct"
              {...register("totalProduct")}
              className="mt-1 block w-full px-3 py-3 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Select Sizes */}
          <div className=" mt-8">
            <Select
              size="sm"
              label="Select Sizes"
              placeholder="Choose multiple sizes"
              selectionMode="multiple"
              defaultSelectedKeys={data?.data?.size || []}
              onSelectionChange={(selected) =>
                //@ts-ignore
                setValue("size", Array.from(selected))
              }
              className="w-full"
              {...register("size")}
            >
              {sizeData.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </Select>
            {errors.size && (
              <p className="text-red-500 text-xs mt-1">{errors.size.message}</p>
            )}
          </div>
        </div>

        {/* Display the images */}
        <div className="flex flex-wrap gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative border p-2 mt-4">
              <Image
                src={photo.img}
                alt="product"
                width={100}
                height={100}
                className="h-40 w-40 object-cover"
              />
              <div
                className="absolute top-0 right-0 text-red-600 cursor-pointer"
                onClick={() => handleRemoveImage(photo.id)}
              >
                <Trash size={16} className="bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className=" mt-6 w-full flex  justify-center mx-auto pb-16">
          <div className="w-full flex justify-center items-center md:gap-12 gap-6">
            <Button
              size="lg"
              onClick={() => router.back()}
              className=" md:px-12 px-6  py-2 w-full rounded-none bg-red-500 text-white flex items-center"
            >
              <ArrowLeft size={20} /> Back Product
            </Button>
            <Button
              size="lg"
              isDisabled={updateing}
              type="submit"
              className=" md:px-12 px-6 py-2 w-full rounded-none  bg-[#0c9ecf] text-white flex items-center"
            >
              Update Product
              <Plus />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdatePage;
