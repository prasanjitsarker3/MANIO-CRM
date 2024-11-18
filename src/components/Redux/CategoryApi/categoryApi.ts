/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewCategory: builder.mutation({
      query: (data: any) => {
        return {
          url: "/category/created",
          method: "POST",
          contentType: "multipart/form-data",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),
    getAllCategory: builder.query({
      query: (arg: any) => ({
        url: "/category",
        method: "GET",
        params: arg,
      }),
      providesTags: ["category"],
    }),
    getDeleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["category"],
    }),

    toggleCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/update/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["category"],
    }),

    createNewBanner: builder.mutation({
      query: (data: any) => ({
        url: "/banner/create",
        method: "POST",
        contentType: "multipart/form-data",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),

    getAllBanner: builder.query({
      query: (arg: any) => ({
        url: "/banner",
        method: "GET",
        params: arg,
      }),
      providesTags: ["banner"],
    }),
    deleteBanner: builder.mutation({
      query: (id: string) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useCreateNewCategoryMutation,
  useGetAllCategoryQuery,
  useGetDeleteCategoryMutation,
  useCreateNewBannerMutation,
  useGetAllBannerQuery,
  useDeleteBannerMutation,
  useToggleCategoryMutation,
} = categoryApi;
