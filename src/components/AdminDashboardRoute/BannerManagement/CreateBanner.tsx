"use client";
import { useCreateNewBannerMutation } from "@/components/Redux/CategoryApi/categoryApi";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { CloudUpload, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  img: FileList;
  name: string;
};

const CreateBanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [createBanner] = useCreateNewBannerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Creating...");
    const formData = new FormData();
    const { img, name } = data;
    formData.append("data", JSON.stringify(name));
    if (img.length > 0) {
      formData.append("file", img[0]);
    }
    const res = await createBanner(formData);
    console.log("Res", res);
    if (res?.data?.statusCode === 201) {
      toast.success(res?.data?.message, { id: toastId, duration: 1000 });
      onClose();
      reset();
      setPreviewImage(null);
    } else {
      toast.error(res?.data?.message, { id: toastId, duration: 1000 });
    }
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        className=" bg-[#0c9ecf] text-white rounded-none px-6 "
      >
        <Plus />
        Add Banner
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
              Add New Banner
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center space-x-3 w-full">
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer w-full flex items-center space-x-2 p-3 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  <CloudUpload size={24} className="text-gray-600" />{" "}
                  <span className="text-gray-600">Upload Photo</span>
                </label>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  {...register("img", {
                    required: "Profile photo is required",
                  })}
                  onChange={(e) => {
                    onImageChange(e); // Show preview image
                    register("img").onChange(e); // Update form data
                  }}
                  className="hidden"
                />
              </div>
              {errors.img && (
                <span className="text-red-500">{errors.img.message}</span>
              )}
              <Input
                size="lg"
                placeholder="Category Name"
                {...register("name", {
                  required: "Category name is required",
                })}
                className="mb-4"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              {previewImage && (
                <div className="mt-4">
                  <Image
                    src={previewImage}
                    alt="Selected Preview"
                    width={100}
                    height={100}
                    className="w-full h-48 object-cover rounded-md border"
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter className=" w-full items-center">
              <Button
                size="sm"
                className="bg-[#F31260] text-white w-full"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                size="sm"
                className="bg-[#0c9ecf] text-white w-full flex items-center gap-2"
                type="submit"
              >
                <Plus size={20} /> Add Banner
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateBanner;
