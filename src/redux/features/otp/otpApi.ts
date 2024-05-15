/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.otp],
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/resend-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.otp],
    }),
  }),
});

export const { useVerifyOtpMutation, useResendOtpMutation } = otpApi;
