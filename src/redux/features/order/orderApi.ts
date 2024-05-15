/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetorderByBookingId: builder.query({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
  }),
});

export const { useGetorderByBookingIdQuery } = orderApi;
