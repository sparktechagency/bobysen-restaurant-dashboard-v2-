/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { tagTypesList } from "../../types/tagTypes";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.bookatable.mu/api/v1",
  // baseUrl: "http://192.168.10.5:5005/api/v1",
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const otpToken = sessionStorage.getItem("token");

    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    if (otpToken) {
      headers.set("token", otpToken);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  //console.log(result);
  if (result?.error?.status === 404) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 403) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    //console.log("Sending refresh token");

    const res = await fetch(
      "https://api.bookatable.mu/api/v1/auth/refresh-token",
      {
        method: "POST",
        // credentials: "include",
      }
    );

    const data = await res.json();
    //console.log("data", data);
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
