import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
};
const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});
export const { setCollapsed } = LayoutSlice.actions;
export default LayoutSlice.reducer;
