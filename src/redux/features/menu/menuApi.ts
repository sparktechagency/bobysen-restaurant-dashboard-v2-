/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMenuCategorty: builder.mutation({
      query: (data) => ({
        url: "/menu-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.menu],
    }),
    getMYmenuCategories: builder.query({
      query: () => ({
        url: `/menu-categories`,
        method: "GET",
      }),
      providesTags: [tagTypes.menu],
    }),
    getSingleCategory: builder.query({
      query: (id: string) => ({
        url: `/menu-categories/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.menu],
    }),
    EditMyMenuCategories: builder.mutation({
      query: (data) => ({
        url: `/menu-categories/${data?.id}`,
        method: "PATCH",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.menu],
    }),
    addMenu: builder.mutation({
      query: (body) => ({
        url: `/menu`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [tagTypes.menu],
    }),
    updateMenu: builder.mutation({
      query: (data) => {
        //console.log("Data to be sent:", data); // Add this line to log the data
        return {
          url: `/menu/${data?.id}`,
          method: "PATCH",
          body: data?.body,
        };
      },
      invalidatesTags: [tagTypes.menu],
    }),

    deleteMenu: builder.mutation({
      query: (id: string) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.menu],
    }),
    getAllMenu: builder.query({
      query: (query) => ({
        url: `/menu`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.menu],
    }),
    getSingleMenu: builder.query({
      query: (id: string) => ({
        url: `/menu/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.menu],
    }),
  }),
});

export const {
  useAddMenuCategortyMutation,
  useGetAllMenuQuery,
  useGetSingleCategoryQuery,
  useUpdateMenuMutation,
  useEditMyMenuCategoriesMutation,
  useAddMenuMutation,
  useGetMYmenuCategoriesQuery,
  useDeleteMenuMutation,
  useGetSingleMenuQuery,
} = menuApi;
