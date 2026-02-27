import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  approveRejectTask,
  fetcAllTask,
  fetchAllApproval,
  fetchTeam,
  fetchUserOrg,
  getWorkflowApproval,
  getWorkflowExecutions,
  getWorkflowTasks,
  getWorkflowVersions,
  Login,
  PublishWorkflow,
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
  "workflows/fetchAll",
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
  "tasks/fetchAll",
  async (status, { rejectWithValue }) => {
    try {
      return await fetcAllTask(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getApprovalList = createAsyncThunk(
  "approval/fetchAll",
  async (status, { rejectWithValue }) => {
    try {
      return await fetchAllApproval(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const approve_reject = createAsyncThunk(
  "approval/decide",
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
  "user-org/fetchAll",
  async (_, rejectWithValue) => {
    try {
      return await fetchUserOrg();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_teams = createAsyncThunk(
  "teams/fetchAll",
  async (_, rejectWithValue) => {
    try {
      return await fetchTeam();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
