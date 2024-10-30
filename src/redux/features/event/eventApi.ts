/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postAnEvent: builder.mutation({
      query: (data) => ({
        url: "/events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.event],
    }),
    getAllEvents: builder.query({
      query: (query) => ({
        url: "/events",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.event],
    }),
    updateEvents: builder.mutation({
      query: (data) => ({
        url: `/events/${data?.id}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: [tagTypes.event],
    }),
    getEventsForVendor: builder.query({
      query: (query) => ({
        url: `/events/vendor`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.event],
    }),
    getCustomerEventPayments: builder.query({
      query: (query) => ({
        url: `/events-payment`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.event],
    }),
  }),
});

export const {
  usePostAnEventMutation,
  useGetAllEventsQuery,
  useUpdateEventsMutation,
  useGetEventsForVendorQuery,
  useGetCustomerEventPaymentsQuery,
} = eventApi;
