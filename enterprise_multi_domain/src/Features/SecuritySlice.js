import { createSlice } from "@reduxjs/toolkit";
import { create_Security, delete_Security, get_Security, update_Security } from "../RTKThunk/GovernanceThunk";
// import {
//   create_Security,
//   delete_Security,
//   get_Security,
//   update_Security,
// } from "../RTKThunk/AsyncThunk";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const SecuritySlice = createSlice({
  name: "security",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_Security.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Security.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(get_Security.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(create_Security.pending, (state) => {
        state.loading = true;
      })
      .addCase(create_Security.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(create_Security.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(update_Security.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Security.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(update_Security.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_Security.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_Security.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((s) => s.id !== action.payload);
      })
      .addCase(delete_Security.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default SecuritySlice.reducer;
