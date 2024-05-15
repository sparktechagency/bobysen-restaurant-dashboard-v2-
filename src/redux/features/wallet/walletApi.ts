/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "../../../types";
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sentVendorAmount: builder.mutation({
      query: (data) => ({
        url: `/wallet/${data?.id}`,
        method: "POST",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.wallet, tagTypes.notification],
    }),
    getVendorWalletDetails: builder.query({
      query: (query) => ({
        url: "/wallet",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.wallet],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getVendorWalletDetailsbyAdmin: builder.query({
      query: (query) => ({
        url: "/wallet/admin",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.wallet],
    }),
    getWalletStaticsForAdmin: builder.query({
      query: (query) => ({
        url: "/wallet/admin/statics",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.wallet],
    }),
    getSingleWallet: builder.query({
      query: (id) => ({
        url: `/wallet/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.wallet],
    }),
  }),
});

export const {
  useSentVendorAmountMutation,
  useGetVendorWalletDetailsQuery,
  useGetVendorWalletDetailsbyAdminQuery,
  useGetSingleWalletQuery,
  useGetWalletStaticsForAdminQuery,
} = walletApi;
