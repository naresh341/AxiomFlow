import { createSlice } from "@reduxjs/toolkit";
import {
  Forget_Password,
  Login_Credentials,
  loginUser,
  logoutUser,
  RegisterUser,
  Reset_Password,
} from "../RTKThunk/AuthThunk";

const initialState = {
  user: null,
  token: null,
  error: null,
  status: "idle",
  data: [],
  loading: false,
  isAuthenticated: false,
};

const LoginSlice = createSlice({
  name: "islogin",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "Success";
        state.isAuthenticated = true;
        const payload = action.payload;
        const token = payload.access_token || payload.token;
        state.token = token;
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Logout failed";
      })

      .addCase(Login_Credentials.fulfilled, (state, action) => {
        state.status = "Success";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token =
          action.payload.access_token || action.payload.token || state.token;
      })
      .addCase(Login_Credentials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Login_Credentials.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.status = "failed";
        state.isAuthenticated = false;
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

export const { resetAuth } = LoginSlice.actions;
export default LoginSlice.reducer;
