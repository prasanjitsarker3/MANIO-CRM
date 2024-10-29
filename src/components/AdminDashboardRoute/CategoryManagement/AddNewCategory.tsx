/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useCreateNewCategoryMutation } from "@/components/Redux/CategoryApi/categoryApi";
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
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  img: FileList;
  name: string;
};

const AddNewCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createCategory, { isLoading }] = useCreateNewCategoryMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Creating...");
    const formData = new FormData();
    const { img, name } = data;
    formData.append("data", JSON.stringify(name));
    if (img.length > 0) {
      formData.append("file", img[0]);
    }
    const res = await createCategory(formData);
    if (res?.data?.statusCode === 201) {
      toast.success(res?.data?.message, { id: toastId, duration: 1000 });
      onClose();
      reset();
    } else {
      toast.error(res?.data?.message, { id: toastId, duration: 1000 });
    }
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className=" bg-[#0c9ecf] text-white py-1 px-4 flex items-center gap-2 rounded-md"
      >
        <Plus />
        Add Category
      </button>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
              Add New Category
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
            </ModalBody>
            <ModalFooter className=" w-full items-center">
              <Button
                size="sm"
                isDisabled={isLoading}
                className="bg-[#F31260] text-white w-full"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                isDisabled={isLoading}
                size="sm"
                className="bg-[#0c9ecf] text-white w-full flex items-center gap-2"
                type="submit"
              >
                <Plus size={20} /> Add Category
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNewCategory;
