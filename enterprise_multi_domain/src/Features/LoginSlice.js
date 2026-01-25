import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../RTKThunk/AsyncThunk";

const initialState = {
  user: null,
  token: null,
  error: null,
  status: "idle",
};

const LoginSlice = createSlice({
  name: "islogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "Success";
        state.user = action.payload;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default LoginSlice.reducer;
