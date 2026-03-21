import { createSlice } from "@reduxjs/toolkit";
import {
  BreakGlassAction,
  fetchStatus,
  LockRolesAction,
  OverRideAction,
} from "../RTKThunk/AsyncThunk";

const initialState = {
  data: [],
  loading: true,
  error: null,
  status: null,
};

const GovernanceActionSlice = createSlice({
  name: "GovAction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OverRideAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(OverRideAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        if (state.status) state.status.override_active = true;
      })
      .addCase(OverRideAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(LockRolesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(LockRolesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        if (state.status) state.status.roles_locked = true;
      })
      .addCase(LockRolesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(BreakGlassAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(BreakGlassAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        if (state.status) state.status.override_active = true;
      })
      .addCase(BreakGlassAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload; // Store the object globally
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GovernanceActionSlice.reducer;
