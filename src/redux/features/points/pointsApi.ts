/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const PointsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReedemRequest: builder.query({
      query: (query) => ({
        url: "/coin/withdraw",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.points],
    }),
    updateRequest: builder.mutation({
      query: (data) => ({
        url: `/coin/withdraw/${data?.id}`,
        method: "PATCH",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.points],
    }),
  }),
});

export const { useGetAllReedemRequestQuery, useUpdateRequestMutation } =
  PointsApi;
