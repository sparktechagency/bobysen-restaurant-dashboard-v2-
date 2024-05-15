import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    insertContent: builder.mutation({
      query: (data) => ({
        url: "/content",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.content],
    }),
    getContent: builder.query({
      query: (query) => ({
        url: `/content`,
        method: "GET",
        query: query,
      }),
      providesTags: [tagTypes.content],
    }),
  }),
});

export const { useInsertContentMutation, useGetContentQuery } = contentApi;
