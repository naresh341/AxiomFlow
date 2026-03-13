import { createSlice } from "@reduxjs/toolkit";
import {
  addNewPolicy,
  addRisk,
  delete_Evidence,
  delete_Policies,
  delete_Risk,
  getComplianceStats,
  getControlEvidence,
  getPolicies,
  getRisks,
  update_Evidence,
  update_Policies,
  update_Risk,
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
      .addCase(update_Policies.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Policies.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.policies.findIndex(
          (policies) => policies.id === action.payload.id,
        );
        if (index !== -1) {
          state.policies[index] = action.payload;
        }
      })
      .addCase(update_Policies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_Policies.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_Policies.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = state.policies.filter(
          (policy) => policy.id !== action.meta.arg,
        );
      })
      .addCase(delete_Policies.rejected, (state, action) => {
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
        state.evidence = action.payload;
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

      .addCase(update_Evidence.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Evidence.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.evidence.findIndex(
          (evidence) => evidence.id === action.payload.id,
        );
        if (index !== -1) {
          state.evidence[index] = action.payload;
        }
      })
      .addCase(update_Evidence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_Evidence.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_Evidence.fulfilled, (state, action) => {
        state.loading = false;
        state.evidence = state.evidence.filter(
          (evidence) => evidence.id !== action.payload,
        );
      })
      .addCase(delete_Evidence.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(update_Risk.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Risk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.risks.findIndex(
          (risks) => risks.id === action.payload.id,
        );
        if (index !== -1) {
          state.risks[index] = action.payload;
        }
      })
      .addCase(update_Risk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_Risk.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_Risk.fulfilled, (state, action) => {
        state.loading = false;
        state.risks = state.risks.filter(
          (risks) => risks.id !== action.payload,
        );
      })
      .addCase(delete_Risk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComplianceError } = complianceSlice.actions;
export default complianceSlice.reducer;
