import { createAsyncThunk } from "@reduxjs/toolkit";
import { ForgetPassword, loginApi, LoginCredentials, Register, ResetPassword } from "../Services/ApiService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const Login_Credentials = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LoginCredentials();
      return response;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch user");
    }
  },
);

export const RegisterUser = createAsyncThunk(
  "auth/Register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Register(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const Reset_Password = createAsyncThunk(
  "auth/ResetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await ResetPassword({ token, password });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const Forget_Password = createAsyncThunk(
  "auth/ForgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await ForgetPassword(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
  