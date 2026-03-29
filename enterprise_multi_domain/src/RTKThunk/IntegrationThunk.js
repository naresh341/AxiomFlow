import { createAsyncThunk } from "@reduxjs/toolkit";
import { connectIntegration, createIntegration, disconnectIntegration, fetchIntegration, fetchUserIntegration, saveIntegration } from "../Services/ApiService";

export const fetchIntegrationsThunk = createAsyncThunk(
  "integration/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchIntegration();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const connectIntegrationThunk = createAsyncThunk(
  "integration/connect",
  async (data, { rejectWithValue }) => {
    try {
      return await connectIntegration(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const disconnectIntegrationThunk = createAsyncThunk(
  "integration/disconnect",
  async (data, { rejectWithValue }) => {
    try {
      return await disconnectIntegration(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchUserIntegrationsThunk = createAsyncThunk(
  "integration/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUserIntegration();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const createIntegrationThunk = createAsyncThunk(
  "integration/createIntegration",
  async (data, { rejectWithValue }) => {
    try {
      return await createIntegration(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const saveMappingThunk = createAsyncThunk(
  "integration/configureIntegration",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await saveIntegration(id, { data });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
