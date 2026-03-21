import { createSlice } from "@reduxjs/toolkit";
import {
  Forget_Password,
  Login_Credentials,
  loginUser,
  RegisterUser,
  Reset_Password,
} from "../RTKThunk/AsyncThunk";

const initialState = {
  user: null,
  token: null,
  error: null,
  status: "idle",
  data: [],
  loading: false,
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
        const payload = action.payload;
        console.log("LOGIN RESPONSE:", action.payload);
        const token = payload.access_token || payload.token;
        state.token = token;
        state.user = payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
        state.user = null;
        state.token = null;
      })
      .addCase(Login_Credentials.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "Success";
      })
      .addCase(Login_Credentials.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Forget_Password.pending, (state) => {
        state.loading = true;
      })
      .addCase(Forget_Password.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = "Email Sent";
      })
      .addCase(Forget_Password.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Reset_Password.pending, (state) => {
        state.loading = true;
      })
      .addCase(Reset_Password.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = "Password Reset";
      })
      .addCase(Reset_Password.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default LoginSlice.reducer;
