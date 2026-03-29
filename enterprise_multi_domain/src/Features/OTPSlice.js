import { createSlice } from "@reduxjs/toolkit";
import { Send_OTP, Verify_OTP } from "../RTKThunk/GovernanceThunk";
// import { Send_OTP, Verify_OTP } from "../RTKThunk/AsyncThunk";

const initialState = {
  otp: null, // 1. Change from [] to null
  loading: false, // 2. Default to false so it's not "loading" before you even click
  error: null,
};

const OTPSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Send_OTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Send_OTP.fulfilled, (state, action) => {
        state.loading = false;
        // 3. REPLACING, not pushing. Now state.otp is the object: {status: '...', data: {...}}
        state.otp = action.payload;
      })
      .addCase(Send_OTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Verify_OTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(Verify_OTP.fulfilled, (state, action) => {
        state.loading = false;
        // 4. Same here, replace the state with the verification result
        state.otp = action.payload;
      })
      .addCase(Verify_OTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default OTPSlice.reducer;
