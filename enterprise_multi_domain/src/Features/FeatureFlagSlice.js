import { createSlice } from "@reduxjs/toolkit";
import {
  create_Flag,
  get_Flag,
  toggle_Flag,
  update_Flag,
} from "../RTKThunk/AsyncThunk";

const initialState = {
  flags: [],
  loading: false,
  error: null,
};

const FeatureFlagSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_Flag.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Flag.fulfilled, (state, action) => {
        state.flags = action.payload;
        state.loading = false;
      })
      .addCase(create_Flag.fulfilled, (state, action) => {
        state.flags.push(action.payload);
      })
      .addCase(create_Flag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggle_Flag.fulfilled, (state, action) => {
        const index = state.flags.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.flags[index] = action.payload;
        }
      })
      .addCase(update_Flag.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Flag.fulfilled, (state, action) => {
        const index = state.flags.findIndex((f) => f.id === action.payload.id);

        if (index !== -1) {
          state.flags[index] = action.payload;
        }
      })
      .addCase(update_Flag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default FeatureFlagSlice.reducer;
