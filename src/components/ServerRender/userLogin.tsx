"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { AuthKey } from "../Lib/AuthKey";

export const userLogin = async (formData: FieldValues) => {
  const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const userInfo = await res.json();
  if (userInfo?.data?.accessToken) {
    cookies().set(AuthKey, userInfo?.data?.accessToken);
  }
  return userInfo;
};
