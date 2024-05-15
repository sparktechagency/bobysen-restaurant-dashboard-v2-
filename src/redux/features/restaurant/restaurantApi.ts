/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const restaurantsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRestaurant: builder.mutation({
      query: (data) => ({
        url: "/restaurants",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.restaurant],
    }),
    EditRestaurant: builder.mutation({
      query: (body) => ({
        url: `/restaurants/${body?.id}`,
        method: "PATCH",
        body: body?.data,
      }),
      invalidatesTags: [tagTypes.restaurant],
    }),
    DeleteFile: builder.mutation({
      query: (body) => ({
        url: `/restaurants/files/delete`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: [tagTypes.restaurant],
    }),
    getAllRestaurantForadmin: builder.query({
      query: (query: Record<string, any>) => ({
        url: "/restaurants/admin",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.restaurant],
    }),
    getAllRestaurants: builder.query({
      query: (query: Record<string, any>) => ({
        url: "/restaurants/dashboard",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.restaurant],
    }),
    getSingleRestaurant: builder.query({
      query: (id: string) => ({
        url: `/restaurants/owner/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.restaurant],
    }),
  }),
});

export const {
  useAddRestaurantMutation,
  useGetAllRestaurantsQuery,
  useEditRestaurantMutation,
  useGetSingleRestaurantQuery,
  useDeleteFileMutation,
  useGetAllRestaurantForadminQuery,
} = restaurantsApi;
