/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const tableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTable: builder.mutation({
      query: (data) => ({
        url: "/tables",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.table],
    }),
    getTables: builder.query({
      query: () => ({
        url: `/tables/owner`,
        method: "GET",
      }),
      providesTags: [tagTypes.table],
    }),
    editTable: builder.mutation({
      query: (data) => ({
        url: `/tables/${data?.id}`,
        method: "PATCH",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.table],
    }),

    deleteTable: builder.mutation({
      query: (data) => ({
        url: `/tables/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.table],
    }),

    getSingleTable: builder.query({
      query: (id: string) => ({
        url: `/table/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.table],
    }),
  }),
});

export const {
  useAddTableMutation,
  useGetSingleTableQuery,
  useGetTablesQuery,
  useEditTableMutation,
  useDeleteTableMutation,
} = tableApi;
