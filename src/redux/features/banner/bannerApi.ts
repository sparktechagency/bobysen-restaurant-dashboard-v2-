/* eslint-disable @typescript-eslint/no-explicit-any */

import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    insertBanner: builder.mutation({
      query: (data) => ({
        url: "/banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
    getallbanner: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const {
  useInsertBannerMutation,
  useGetallbannerQuery,
  useDeleteBannerMutation,
} = bannerApi;
