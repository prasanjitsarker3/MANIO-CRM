/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";
import { userLogin } from "@/components/ServerRender/userLogin";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "@/components/Redux/hooks";
import { setUser } from "@/components/Redux/State/authSlice";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Login Processing !");
    try {
      const res = await userLogin(data);
      if (res?.statusCode === 201) {
        dispatch(setUser({ accessToken: res.data?.accessToken }));
        reset();
        const tokenRole: DecodedToken = jwtDecode(res?.data?.accessToken);
        toast.success(res?.message, { id: toastId, duration: 2000 });
        router.push(`/${tokenRole.role}`);
        setLoading(false);
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Error:", err?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-[#0c9ecf] bg-gray-200 p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-slate-700"
            >
              Email <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="pl-10 block w-full p-3 border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })} // register input with validation
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="pl-10 pr-10 block w-full p-3 border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })} // register input with validation
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#0c9ecf] text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              {loading ? (
                <Spinner className=" text-[#0c9ecf]" size="sm" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
