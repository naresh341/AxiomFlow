import { createAsyncThunk } from "@reduxjs/toolkit";
import { Login, WorkflowData } from "../Services/ApiService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, apierr) => {
    try {
      const response = await Login(credentials);
      return response;
    } catch (error) {
      return apierr.rejectWithValue(error.message);
    }
  },
);

export const getWorkflow = createAsyncThunk(
  "workflows/fetchAll",
  async (status, apierr) => {
    try {
      return await WorkflowData(status);
    } catch (error) {
      return apierr.rejectWithValue(error.message);
    }
  },
);
