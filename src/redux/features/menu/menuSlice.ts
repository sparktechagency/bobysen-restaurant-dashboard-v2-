import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
};
const menuSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCategoryDetails: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { setCategoryDetails } = menuSlice.actions;
export default menuSlice.reducer;
