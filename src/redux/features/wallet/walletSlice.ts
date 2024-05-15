import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentHistory: null,
};

const walletSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setPaymentHistory: (state, action) => {
      state.paymentHistory = action.payload;
    },
  },
});
export const { setPaymentHistory } = walletSlice.actions;
export default walletSlice.reducer;
