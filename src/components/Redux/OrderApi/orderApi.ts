/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrderFromDB: builder.query({
      query: (arg: any) => ({
        url: "/order",
        method: "GET",
        params: arg,
      }),
      providesTags: ["order"],
    }),
    getAllConfirmOrderFromDB: builder.query({
      query: (arg: any) => ({
        url: "/order/confirmOrder",
        method: "GET",
        params: arg,
      }),
      providesTags: ["order"],
    }),
    getAllDeliveryOrderFromDB: builder.query({
      query: (arg: any) => ({
        url: "/order/deliveryOrder",
        method: "GET",
        params: arg,
      }),
      providesTags: ["order"],
    }),
    getAllOrderForAdmin: builder.query({
      query: (arg: any) => ({
        url: "/order/adminOrder",
        method: "GET",
        params: arg,
      }),
      providesTags: ["order"],
    }),
    getAllReturnOrder: builder.query({
      query: (arg: any) => ({
        url: "/order/returnOrder",
        method: "GET",
        params: arg,
      }),
      providesTags: ["order"],
    }),
    getSingleOrderView: builder.query({
      query: (id: string) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    deleteOrderFromDB: builder.mutation({
      query: (id: string) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    pdfDownloadFromDB: builder.mutation({
      query: (id: string) => ({
        url: `/order/pdf/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["order"],
    }),

    orderStatusUpdate: builder.mutation({
      query: (data: any) => {
        return {
          url: `/order/${data.id}`,
          method: "PATCH",
          body: data.updateData,
        };
      },
      invalidatesTags: ["order", "product", "meta"],
    }),

    discountAndDeliveryFromDB: builder.mutation({
      query: (orderData: any) => ({
        url: `/order/updateDiscount`,
        method: "PATCH",
        body: orderData,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllOrderFromDBQuery,
  useGetSingleOrderViewQuery,
  useDeleteOrderFromDBMutation,
  useOrderStatusUpdateMutation,
  useGetAllConfirmOrderFromDBQuery,
  useGetAllDeliveryOrderFromDBQuery,
  usePdfDownloadFromDBMutation,
  useGetAllOrderForAdminQuery,
  useGetAllReturnOrderQuery,
  useDiscountAndDeliveryFromDBMutation,
} = orderApi;
