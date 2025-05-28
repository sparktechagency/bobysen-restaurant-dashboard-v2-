/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export type TCategory = {
  name: string;
  _id: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

const initialState: TCategory = {
  name: "",
  _id: "",
  isActive: false,
  isDeleted: false,
  createdAt: "",
  updatedAt: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetCategory: () => initialState,
  },
});

export const { setCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
