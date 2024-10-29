/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (data: any) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: (args: any) => ({
        url: "/users",
        method: "GET",
        params: args,
      }),
      providesTags: ["user"],
    }),
    getUserStatusUpdate: builder.mutation({
      query: (data) => ({
        url: `/users/${data?.id}`,
        method: "PATCH",
        body: data.updateData,
      }),
      invalidatesTags: ["user"],
    }),
    getUserDeleted: builder.mutation({
      query: (id: string) => ({
        url: `/users/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    myProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useGetAllUserQuery,
  useGetUserStatusUpdateMutation,
  useGetUserDeletedMutation,
  useMyProfileQuery,
} = userApi;
