/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "../../../types";
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotification: builder.query({
      query: (query) => ({
        url: `/notifications`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.notification, tagTypes.wallet],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    markAsRead: builder.mutation({
      query: () => ({
        url: `/notifications`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification, tagTypes.wallet],
    }),
  }),
});

export const { useGetMyNotificationQuery, useMarkAsReadMutation } =
  notificationApi;
