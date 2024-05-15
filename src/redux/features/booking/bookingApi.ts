/* eslint-disable @typescript-eslint/no-explicit-any */

import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllBooking: builder.query({
      query: (query) => ({
        url: "/booking/owner",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.booking],
      // transformResponse: (response: TResponseRedux<any>) => {
      //   console.log("response", response);
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
    }),
    UpdateBooking: builder.mutation({
      query: (data) => ({
        url: `/booking/${data?.id}`,
        method: "PATCH",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    GetBookingStatics: builder.query({
      query: (query) => ({
        url: `/booking/statics`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useGetAllBookingQuery,
  useUpdateBookingMutation,
  useGetBookingStaticsQuery,
} = bookingApi;
