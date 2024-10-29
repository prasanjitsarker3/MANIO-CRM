/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const metaDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModeratorDashboardData: builder.query({
      query: () => ({
        url: "/meta/moderatorMeta",
        method: "GET",
      }),
      providesTags: ["meta"],
    }),
    getAdminDashboardData: builder.query({
      query: () => ({
        url: "/meta/adminMeta",
        method: "GET",
      }),
      providesTags: ["meta"],
    }),
  }),
});

export const {
  useGetModeratorDashboardDataQuery,
  useGetAdminDashboardDataQuery,
} = metaDataApi;
