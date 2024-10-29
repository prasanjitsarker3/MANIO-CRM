/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewProduct: builder.mutation({
      query: (data: any) => ({
        url: "/product/create",
        method: "POST",
        contentType: "multipart/form-data",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    getAllProduct: builder.query({
      query: (arg: any) => ({
        url: "/product",
        method: "GET",
        params: arg,
      }),
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getSingleProductUpdate: builder.mutation({
      query: (updateDate: any) => ({
        url: "/product/update",
        method: "POST",
        contentType: "multipart/form-data",
        body: updateDate,
      }),
      invalidatesTags: ["product"],
    }),

    getDeleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateNewProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useGetSingleProductUpdateMutation,
  useGetDeleteProductMutation,
} = productApi;
