import { createSlice } from "@reduxjs/toolkit";
import { get_auditLogs } from "../RTKThunk/AsyncThunk";

const initialState = {
  auditdata: [],
  error: null,
  loading: false,
};

const GovernanceSlice = createSlice({
  name: "governance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_auditLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_auditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.auditdata = action.payload;
      })
      .addCase(get_auditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GovernanceSlice.reducer;
