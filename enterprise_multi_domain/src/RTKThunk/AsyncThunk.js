import { createAsyncThunk } from "@reduxjs/toolkit";
import { Login } from "../Services/ApiService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await Login(credentials);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);



