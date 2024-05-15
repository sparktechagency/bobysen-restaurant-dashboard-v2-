import { createSlice } from "@reduxjs/toolkit";
export type Totp = {
  token: string;
};

type TOtpState = {
  token: null | string;
};

const initialState: TOtpState = {
  token: null,
};

const otpSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = otpSlice.actions;

export default otpSlice.reducer;
