import { createSlice } from "@reduxjs/toolkit";
import {
  addNewPolicy,
  addRisk,
  getComplianceStats,
  getControlEvidence,
  getPolicies,
  getRisks,
  uploadControlEvidence,
} from "../RTKThunk/AsyncThunk";

const complianceSlice = createSlice({
  name: "compliance",
  initialState: {
    policies: [],
    risks: [],
    evidence: [],
    uploading: null,
    stats: {
      active_policies: 0,
      open_risks: 0,
      critical_risks: 0,
      pending_evidence: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearComplianceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Policies
      .addCase(getPolicies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = action.payload;
      })
      .addCase(getPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRisks.fulfilled, (state, action) => {
        state.risks = action.payload;
      })
      .addCase(getComplianceStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getControlEvidence.fulfilled, (state, action) => {
        state.loading = false;
        state.evidence = action.payload; // Store evidence for the selected control
      })
      .addCase(uploadControlEvidence.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadControlEvidence.fulfilled, (state, action) => {
        state.uploading = false;
        state.evidence.unshift(action.payload);
      })
      .addCase(uploadControlEvidence.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })
      .addCase(addNewPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.policies.unshift(action.payload);
      })
      .addCase(addNewPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRisk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRisk.fulfilled, (state, action) => {
        state.loading = false;
        state.risks.unshift(action.payload);
      })
      .addCase(addRisk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComplianceError } = complianceSlice.actions;
export default complianceSlice.reducer;
