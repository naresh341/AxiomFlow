import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  approveRejectTask,
  createPolicy,
  CreateRisk,
  fetcAllTask,
  fetchAllApproval,
  fetchauditLogs,
  fetchComplianceStats,
  fetchControlEvidence,
  fetchPolicies,
  fetchRisks,
  fetchTeam,
  fetchUserOrg,
  getWorkflowApproval,
  getWorkflowExecutions,
  getWorkflowTasks,
  getWorkflowVersions,
  Login,
  PublishWorkflow,
  uploadEvidence,
  workflowById,
  WorkflowData,
} from "../Services/ApiService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, apierr) => {
    try {
      const response = await Login(credentials);
      return response;
    } catch (error) {
      return apierr.rejectWithValue(error.message);
    }
  },
);

export const getWorkflow = createAsyncThunk(
  "workflows/fetchWorkflow",
  async (status, apierr) => {
    try {
      return await WorkflowData(status);
    } catch (error) {
      return apierr.rejectWithValue(error.message);
    }
  },
);

export const createWorkflow = createAsyncThunk(
  "workflow/create",
  async (flowdata, { rejectWithValue }) => {
    try {
      return await PublishWorkflow(flowdata);
    } catch (error) {
      const message = error.response.data.detail || error.message;
      return rejectWithValue(message);
    }
  },
);

export const getWorkflowById = createAsyncThunk(
  "workflow/workflow_id",
  async (id, { rejectWithValue }) => {
    try {
      return await workflowById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTaskList = createAsyncThunk(
  "tasks/fetchTask",
  async (status, { rejectWithValue }) => {
    try {
      return await fetcAllTask(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getApprovalList = createAsyncThunk(
  "approval/fetchApproval",
  async (status, { rejectWithValue }) => {
    try {
      return await fetchAllApproval(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const approve_reject = createAsyncThunk(
  "approval/ApproveOrRject",
  async (data, { rejectWithValue }) => {
    try {
      return await approveRejectTask(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_Workflow_Tasks = createAsyncThunk(
  `/workflow/fetchTasks`,
  async (data, { rejectWithValue }) => {
    try {
      return await getWorkflowTasks(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Versions = createAsyncThunk(
  `/workflow/fetchVersions`,
  async (data, { rejectWithValue }) => {
    try {
      return await getWorkflowVersions(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Executions = createAsyncThunk(
  `/workflow/fetchExecutions`,
  async (data, { rejectWithValue }) => {
    try {
      return await getWorkflowExecutions(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Approvals = createAsyncThunk(
  `/workflow/fetchApprovals`,
  async (data, { rejectWithValue }) => {
    try {
      return await getWorkflowApproval(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_UserOrg = createAsyncThunk(
  "user-org/Users",
  async (_, rejectWithValue) => {
    try {
      return await fetchUserOrg();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_teams = createAsyncThunk(
  "teams/teams",
  async (_, rejectWithValue) => {
    try {
      return await fetchTeam();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_auditLogs = createAsyncThunk(
  "governance/audit-Logs",
  async (actorType, rejectWithValue) => {
    try {
      return await fetchauditLogs(actorType);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getPolicies = createAsyncThunk(
  "compliance/fetchPolicies",
  async (status, { rejectWithValue }) => {
    try {
      return await fetchPolicies(status);
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  },
);

export const addNewPolicy = createAsyncThunk(
  "compliance/createPolicy",
  async (policyData, { rejectWithValue }) => {
    try {
      return await createPolicy(policyData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  },
);

export const getRisks = createAsyncThunk(
  "compliance/fetchRisks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRisks();
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  },
);

// IDENTIFY NEW RISK
export const addRisk = createAsyncThunk(
  "compliance/identifyRisk",
  async (riskData, { rejectWithValue }) => {
    try {
      return await CreateRisk(riskData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  },
);

// FETCH DASHBOARD STATS
export const getComplianceStats = createAsyncThunk(
  "compliance/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchComplianceStats();
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  },
);

export const getControlEvidence = createAsyncThunk(
  "compliance/fetchControlEvidence",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchControlEvidence();
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  },
);

// 2. UPLOAD NEW EVIDENCE (Handles Files)
export const uploadControlEvidence = createAsyncThunk(
  "compliance/uploadEvidence",
  async ({ controlId, formData }, { rejectWithValue }) => {
    try {
      return await uploadEvidence(controlId, formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  },
);
