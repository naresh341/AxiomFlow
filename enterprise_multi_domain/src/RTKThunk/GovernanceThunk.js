import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createFlag,
  createPolicy,
  CreateRisk,
  createSecurity,
  deleteAuditlogs,
  deleteEvidence,
  deletePolicies,
  deleteRisk,
  deleteSecurity,
  fetchAllOrg,
  fetchauditLogs,
  fetchBilling,
  fetchCompliance,
  fetchComplianceStats,
  fetchControlEvidence,
  fetchGovernanceStatus,
  fetchInvoices,
  fetchOrganization,
  fetchPolicies,
  fetchRisks,
  fetchSecurity,
  fetchSubscription,
  getFlag,
  getSecurity,
  GovBreak_Glass,
  GovLock_Roles,
  GovOver_Ride,
  SendOTP,
  toggleFlag,
  updateAuditlogs,
  updateBilling,
  updateEvidence,
  updateFlag,
  updateOrg,
  updateOrgSecurity,
  updatePolicies,
  updateRisk,
  updateSecurity,
  updateSubscription,
  uploadEvidence,
  uploadlogo,
  VerifyOTP,
} from "../Services/ApiService";

export const get_auditLogs = createAsyncThunk(
  "governance/audit-Logs",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchauditLogs(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_AuditLogs = createAsyncThunk(
  "governance/updateAuditLogs",
  async (data, { rejectWithValue }) => {
    try {
      const { id, ...payload } = data;

      const response = await updateAuditlogs(id, payload);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const delete_AuditLogs = createAsyncThunk(
  "governance/deleteAuditLogs",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteAuditlogs(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getPolicies = createAsyncThunk(
  "compliance/fetchPolicies",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchPolicies(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewPolicy = createAsyncThunk(
  "compliance/createPolicy",
  async (policyData, { rejectWithValue }) => {
    try {
      return await createPolicy(policyData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Policies = createAsyncThunk(
  "compliance/updatePolicies",
  async (data, { rejectWithValue }) => {
    try {
      const { id, ...payload } = data;

      const response = await updatePolicies(id, payload);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const delete_Policies = createAsyncThunk(
  "compliance/deletePolicies",
  async (id, { rejectWithValue }) => {
    try {
      return await deletePolicies(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ===========================RISK===================================
export const getRisks = createAsyncThunk(
  "compliance/fetchRisks",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchRisks(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const addRisk = createAsyncThunk(
  "compliance/identifyRisk",
  async (riskData, { rejectWithValue }) => {
    try {
      return await CreateRisk(riskData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Risk = createAsyncThunk(
  "compliance/updateRisk",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateRisk(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Risk = createAsyncThunk(
  "compliance/deleteRisk",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteRisk(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//================================= FETCH DASHBOARD STATS=====================
export const getComplianceStats = createAsyncThunk(
  "compliance/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchComplianceStats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//  =======================================EVIDENCE=============================================
export const getControlEvidence = createAsyncThunk(
  "compliance/fetchControlEvidence",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchControlEvidence(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const uploadControlEvidence = createAsyncThunk(
  "compliance/uploadEvidence",
  async ({ controlId, formData }, { rejectWithValue }) => {
    try {
      return await uploadEvidence(controlId, formData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const update_Evidence = createAsyncThunk(
  "compliance/updateEvidence",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateEvidence(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Evidence = createAsyncThunk(
  "compliance/deleteEvidence",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteEvidence(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_Security = createAsyncThunk(
  "Security/getSecurity",
  async (id, { rejectWithValue }) => {
    try {
      return await getSecurity(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const create_Security = createAsyncThunk(
  "Security/createSecurity",
  async ({ id, ip }, { rejectWithValue }) => {
    try {
      return await createSecurity(id, ip);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const update_Security = createAsyncThunk(
  "Security/updateSecurity",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateSecurity(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const delete_Security = createAsyncThunk(
  "Security/deleteSecurity",
  async ({ id, ip }, { rejectWithValue }) => {
    try {
      await deleteSecurity(id, ip);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ======================================== Feature Flag==============================

export const get_Flag = createAsyncThunk(
  "FeatureFlag/getFlag",
  async (_, { rejectWithValue }) => {
    try {
      return await getFlag();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const create_Flag = createAsyncThunk(
  "FeatureFlag/createFlag",
  async (payload, { rejectWithValue }) => {
    try {
      return await createFlag(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const toggle_Flag = createAsyncThunk(
  "FeatureFlag/toggleFlag",
  async (id, { rejectWithValue }) => {
    try {
      return await toggleFlag(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Flag = createAsyncThunk(
  "FeatureFlag/updateFlag",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateFlag(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ===================================== Governance ===========================

export const OverRideAction = createAsyncThunk(
  "Governance/overRide",
  async (payload, { rejectWithValue }) => {
    try {
      return await GovOver_Ride(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const LockRolesAction = createAsyncThunk(
  "Governance/LockRoles",
  async (payload, { rejectWithValue }) => {
    try {
      return await GovLock_Roles(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const BreakGlassAction = createAsyncThunk(
  "Governance/BreakGlass",
  async (payload, { rejectWithValue }) => {
    try {
      return await GovBreak_Glass(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const Send_OTP = createAsyncThunk(
  "OTP/send",
  async (payload, { rejectWithValue }) => {
    try {
      return await SendOTP(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const Verify_OTP = createAsyncThunk(
  "OTP/verify",
  async (payload, { rejectWithValue }) => {
    try {
      return await VerifyOTP(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchStatus = createAsyncThunk(
  "governance/status",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchGovernanceStatus();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetch_Org = createAsyncThunk(
  "Organization/FetchOrganization",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOrganization();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Org = createAsyncThunk(
  "Organization/updateOrg",
  async (data, { rejectWithValue }) => {
    try {
      return await updateOrg(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const update_logo = createAsyncThunk(
  "Organization/updatelogo",
  async (payload, { rejectWithValue }) => {
    try {
      return await uploadlogo(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetch_Subscription = createAsyncThunk(
  "Organization/FetchSubscription",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSubscription();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Subscription = createAsyncThunk(
  "Organization/updateSubscription",
  async (payload, { rejectWithValue }) => {
    try {
      return await updateSubscription(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetch_Billing = createAsyncThunk(
  "Organization/FetchBilling",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBilling();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Billing = createAsyncThunk(
  "Organization/updateBilling",
  async (payload, { rejectWithValue }) => {
    try {
      return await updateBilling(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetch_Compliance = createAsyncThunk(
  "Organization/FetchCompliance",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCompliance();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetch_Security = createAsyncThunk(
  "Organization/FetchSecurity",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSecurity();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_OrgSecurity = createAsyncThunk(
  "Organization/updateSecurity",
  async (payload, { rejectWithValue }) => {
    try {
      return await updateOrgSecurity(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetch_All = createAsyncThunk(
  "Organization/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllOrg();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const fetch_Invoices = createAsyncThunk(
  "Organization/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchInvoices();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
