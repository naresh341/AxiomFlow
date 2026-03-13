import { createSlice } from "@reduxjs/toolkit";
import {
  delete_AuditLogs,
  get_auditLogs,
  update_AuditLogs,
} from "../RTKThunk/AsyncThunk";

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
      })
      .addCase(update_AuditLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_AuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.auditdata.findIndex(
          (auditdata) => auditdata.id === action.payload.id,
        );
        if (index !== -1) {
          state.auditdata[index] = action.payload;
        }
      })
      .addCase(update_AuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_AuditLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_AuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.evidence = state.evidence.filter(
          (evidence) => evidence.id !== action.payload,
        );
      })
      .addCase(delete_AuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GovernanceSlice.reducer;
