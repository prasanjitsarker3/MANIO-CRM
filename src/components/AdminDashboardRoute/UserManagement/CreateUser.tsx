/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCreateNewUserMutation } from "@/components/Redux/UserApi/userApi";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Plus, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const CreateUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isLoading }] = useCreateNewUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = await createUser(data);
      console.log("user res", res);
      if (res?.data?.statusCode === 201) {
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
        size="sm"
        isDisabled={isLoading}
        onClick={onOpen}
        className=" bg-[#0c9ecf] text-white py-1 px-4 flex items-center gap-2 rounded-md"
      >
        <Plus />
        Add New Moderator
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
              Add New Moderator
            </ModalHeader>
            <ModalBody>
              <Input
                size="lg"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="mb-4"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              <Input
                size="lg"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="mb-4"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              <div className="relative mb-4 bg-gray-100 rounded-md">
                <Input
                  size="lg"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="pr-10"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-600" />
                  ) : (
                    <Eye className="text-gray-600" />
                  )}
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
              <Select
                size="sm"
                label="Select Role"
                className="w-full"
                {...register("role")}
              >
                <SelectItem key={"user"} value={"user"}>
                  MODERATOR
                </SelectItem>
                <SelectItem key={"admin"} value={"admin"}>
                  ADMIN
                </SelectItem>
              </Select>
            </ModalBody>

            <ModalFooter className="w-full items-center">
              <Button
                size="sm"
                className="bg-[#F31260] text-white w-full"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                size="sm"
                className="bg-[#0c9ecf] text-white w-full"
                type="submit"
              >
                Create Moderator
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateUser;
