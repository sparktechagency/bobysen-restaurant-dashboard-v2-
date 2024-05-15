import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: {
    _id: null,
    tableName: null,
    tableNo: null,
    seats: null,
    restaurant: null,
  },
};

const tableSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.table = action.payload;
    },
  },
});
export const { setTable } = tableSlice.actions;
export default tableSlice.reducer;
