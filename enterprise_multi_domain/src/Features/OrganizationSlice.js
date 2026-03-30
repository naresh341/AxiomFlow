import { createSlice } from "@reduxjs/toolkit";
import { fetch_All, fetch_Billing, fetch_Compliance, fetch_Invoices, fetch_Org, fetch_Security, fetch_Subscription, update_Billing, update_logo, update_Org, update_OrgSecurity, update_Subscription } from "../RTKThunk/GovernanceThunk";


const initialState = {
  organization: null,
  subscription: null,
  billing: null,
  compliance: null,
  security: null,
  invoices: [],
  loading: false,
  error: null,
  
};

const OrganizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= ORGANIZATION =================
      .addCase(fetch_Org.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch_Org.fulfilled, (state, action) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(fetch_Org.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(update_Org.fulfilled, (state, action) => {
        state.organization = action.payload;
      })

      .addCase(update_logo.fulfilled, (state, action) => {
        state.organization = action.payload.organization;
      })

      // ================= SUBSCRIPTION =================
      .addCase(fetch_Subscription.fulfilled, (state, action) => {
        state.subscription = action.payload;
      })
      .addCase(update_Subscription.fulfilled, (state, action) => {
        state.subscription = action.payload;
      })

      // ================= BILLING =================
      .addCase(fetch_Billing.fulfilled, (state, action) => {
        state.billing = action.payload;
      })
      .addCase(update_Billing.fulfilled, (state, action) => {
        state.billing = action.payload;
      })

      // ================= COMPLIANCE =================
      .addCase(fetch_Compliance.fulfilled, (state, action) => {
        state.compliance = action.payload;
      })

      // ================= SECURITY =================
      .addCase(fetch_Security.fulfilled, (state, action) => {
        state.security = action.payload;
      })
      .addCase(update_OrgSecurity.fulfilled, (state, action) => {
        state.security = action.payload;
      })
      //   ======================All ORG ================

      .addCase(fetch_All.fulfilled, (state, action) => {
        state.organization = action.payload.organization;
        state.subscription = action.payload.subscription;
        state.billing = action.payload.billing;
        state.compliance = action.payload.compliance;
        state.security = action.payload.security;
      })
      //   ====================== Invoices ==================
      .addCase(fetch_Invoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch_Invoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetch_Invoices.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default OrganizationSlice.reducer;
