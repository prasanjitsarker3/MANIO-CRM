/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useGetAllCategoryQuery } from "@/components/Redux/CategoryApi/categoryApi";
import Image from "next/image";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { useCreateNewProductMutation } from "@/components/Redux/ProductApi/productApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { sizeData, typeData } from "@/components/Utlities/productsContants";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type FormValues = {
  name: string;
  price: number;
  discount: number;
  totalProduct: number;
  rating: number;
  size: string[];
  type: "Man" | "Woman";
  categoryId: string;
  images: File[];
};

const CreateNewProduct = () => {
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [description, setDescription] = useState("");
  const [delivery, setDelivery] = useState("");

  const [createNewProduct, { isLoading: creating }] =
    useCreateNewProductMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>();
  const { data, isLoading } = useGetAllCategoryQuery({});
  if (isLoading) {
    <div className=" w-full flex justify-center items-center pt-24">
      <Spinner size="lg" className=" primaryColor" />
    </div>;
  }
  const handleSizeChange = (keys: any) => {
    setSelectedSizes(keys);
    setValue("size", Array.from(keys));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      setValue("images", fileArray);
      const previews = fileArray.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      });

      Promise.all(previews).then((images) => setImagePreviews(images));
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);

    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setValue("images", updatedFiles);
  };

  const categoryData = data?.data?.data || [];

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Creating...");
    const formattedData = {
      name: data.name,
      type: data.type,
      size: data.size,
      categoryId: data.categoryId,
      price: parseFloat(data.price.toString()),
      discount: parseFloat(data.discount.toString()),
      totalProduct: parseInt(data.totalProduct.toString(), 10),
      rating: parseInt(data.rating.toString()),
      description: description,
      delivery: delivery,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(formattedData));

    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file: File) => {
        formData.append("file", file);
      });
    }
    try {
      const res = await createNewProduct(formData);
      if (res?.data?.statusCode === 201) {
        toast.success(res?.data?.message || "Product Create Successfully", {
          id: toastId,
          duration: 1000,
        });
        reset();
        router.push("/admin/product");
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return (
    <div className="bg-white p-10">
      <h1 className="text-lg primaryColor font-semibold pb-5">
        Create New Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* First Section */}
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Name */}
            <div className="mb-4">
              <Input
                label="Product Name"
                className=" bg-gray-100 rounded-none"
                {...register("name", { required: "Product name is required" })}
                fullWidth
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            {/* Select Category */}
            <div className="flex flex-col gap-2">
              <Select
                size="md"
                label="Select Category"
                className=" w-full bg-gray-100 rounded-none"
                {...register("categoryId", {
                  required: "Category is required",
                })}
              >
                {categoryData.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item?.name}
                  </SelectItem>
                ))}
              </Select>
              {errors.categoryId?.message && (
                <span className="text-red-500">
                  {errors.categoryId.message as string}
                </span>
              )}
            </div>
            {/* Select Type */}
            <div className="flex flex-col gap-2">
              <Select
                size="md"
                label="Select Gender"
                className="w-full bg-gray-100 rounded-none"
                {...register("type", {
                  required: "Gender is required",
                })}
              >
                {typeData.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item?.name}
                  </SelectItem>
                ))}
              </Select>
              {errors.type?.message && (
                <span className="text-red-500">
                  {errors.type.message as string}
                </span>
              )}
            </div>
          </div>

          {/* Second Section */}
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Size */}
            <div className="">
              <div className="flex flex-col gap-2">
                <Select
                  size="md"
                  label="Select Sizes"
                  placeholder="Choose multiple sizes"
                  selectionMode="multiple"
                  //@ts-ignore
                  selectedKeys={selectedSizes}
                  onSelectionChange={handleSizeChange}
                  className="w-full bg-gray-100 rounded-none"
                  {...register("size", {
                    required: "Size is required",
                  })}
                >
                  {sizeData.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>

                {errors.size && (
                  <span className="text-red-500">{errors.size.message}</span>
                )}
              </div>
            </div>
            {/* Price */}
            <div className="mb-4 ">
              <Input
                label="Price"
                type="number"
                className=" bg-gray-100 rounded-none"
                {...register("price", { required: "Price is required" })}
                fullWidth
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            {/* Discount */}
            <div className="mb-4">
              <Input
                label="Discount"
                type="number"
                className=" bg-gray-100 rounded-none"
                {...register("discount", { required: "Discount is required" })}
                fullWidth
              />
              {errors.discount && (
                <p className="text-red-500">{errors.discount.message}</p>
              )}
            </div>
          </div>

          {/* Preview Selected Images */}
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="mb-4">
              <label className="block text-slate-800 font-semibold mb-2">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange} // Handle image changes directly
                className="bg-gray-100 rounded p-3 w-full"
              />
              {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )}

              {/* Preview Selected Images */}
              <div className="flex flex-wrap gap-2 mt-6">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="bg-gray-100 relative">
                    <Image
                      src={src}
                      width={60}
                      height={60}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-32 object-cover p-2"
                    />
                    <div
                      className="absolute top-0 right-0 -mt-2 cursor-pointer"
                      onClick={() => removeImage(index)}
                    >
                      <Trash size={16} className="text-red-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Product */}
            <div className="mb-4 mt-8">
              <Input
                label="Total Product"
                type="number"
                className=" bg-gray-100 rounded-none"
                {...register("totalProduct", {
                  required: "Total product is required",
                })}
                fullWidth
              />
              {errors.totalProduct && (
                <p className="text-red-500">{errors.totalProduct.message}</p>
              )}
            </div>
            {/* Product  Rating*/}
            <div className="mb-4 mt-8">
              <Input
                label="Product Rating"
                type="number"
                className=" bg-gray-100 rounded-none"
                {...register("rating")}
                fullWidth
              />
              {errors.totalProduct && (
                <p className="text-red-500">{errors.totalProduct.message}</p>
              )}
            </div>
          </div>
          {/* Text Editor Implement */}
          <div>
            <div className="mb-6">
              <h1 className=" text-slate-800 pb-3 font-semibold">
                Product Description
              </h1>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>
            <div className="mb-6">
              <h1 className=" text-slate-800 pb-3 font-semibold">
                Delivery Options
              </h1>
              <ReactQuill
                theme="snow"
                value={delivery}
                onChange={setDelivery}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className=" flex items-center gap-12 pb-20">
          <Button
            onClick={() => router.back()}
            fullWidth
            className=" bg-red-600 text-white mt-4 flex items-center gap-2 rounded-none"
          >
            <ArrowLeft size={20} />
            Back All Product
          </Button>
          <Button
            isDisabled={creating}
            type="submit"
            fullWidth
            className="bg-[#0c9ecf] text-white mt-4 flex items-center gap-2 rounded-none"
          >
            <Plus /> Add New Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewProduct;
