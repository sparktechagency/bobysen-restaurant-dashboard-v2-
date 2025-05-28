/* eslint-disable @typescript-eslint/no-explicit-any */

import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllCategory: builder.query({
      query: (query) => ({
        url: "/categories",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.category],
      // transformResponse: (response: TResponseRedux<any>) => {
      //   //console.log("response", response);
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
    }),
    GetAllBookingForAdmin: builder.query({
      query: (query) => ({
        url: "/booking/admin",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.booking],
      // transformResponse: (response: TResponseRedux<any>) => {
      //   //console.log("response", response);
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
    }),
    postCategory: builder.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    UpdateCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/${data?.id}`,
        method: "PATCH",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  usePostCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllBookingForAdminQuery,
} = categoryApi;
