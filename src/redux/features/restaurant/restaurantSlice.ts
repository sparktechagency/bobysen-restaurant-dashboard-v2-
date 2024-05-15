import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: null,
};

const restaurantSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.images = action.payload;
    },
  },
});
export const { setImage } = restaurantSlice.actions;
export default restaurantSlice.reducer;
