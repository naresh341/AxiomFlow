import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addExecution,
  addTask,
  addVersion,
  approveRejectTask,
  deleteTask,
  deleteVersion,
  fetcAllTask,
  fetchAllApproval,
  getWorkflowApproval,
  getWorkflowExecutions,
  getWorkflowTasks,
  getWorkflowVersions,
  PublishWorkflow,
  updateTask,
  updateVersion,
  workflowById,
  WorkflowData,
} from "../Services/ApiService";

export const getWorkflow = createAsyncThunk(
  "workflows/fetchWorkflow",
  async (params, { rejectWithValue }) => {
    try {
      return await WorkflowData(params);
    } catch (error) {
      return rejectWithValue(error.message);
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
export const get_Workflow_Tasks = createAsyncThunk(
  `/workflow/fetchTasks`,
  async (
    { workflowId, page, limit, status, priority, search },
    { rejectWithValue },
  ) => {
    try {
      return await getWorkflowTasks({
        workflowId,
        page,
        limit,
        status,
        priority,
        search,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Versions = createAsyncThunk(
  `/workflow/fetchVersions`,
  async ({workflowId, page, limit, status, search }, { rejectWithValue }) => {
    try {
      return await getWorkflowVersions({
        workflowId,
        page,
        limit,
        status,
        search,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Executions = createAsyncThunk(
  `/workflow/fetchExecutions`,
  async ({ workflowId, page, limit, status, search }, { rejectWithValue }) => {
    try {
      return await getWorkflowExecutions({
        workflowId,
        page,
        limit,
        status,
        search,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Approvals = createAsyncThunk(
  `/workflow/fetchApprovals`,
  async (
    { workflowId, page, limit, status, priority, search },
    { rejectWithValue },
  ) => {
    try {
      return await getWorkflowApproval({
        workflowId,
        page,
        limit,
        status,
        priority,
        search,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const add_Version = createAsyncThunk(
  "Version/addVersion",
  async ({ workflowId, payload }, { rejectWithValue }) => {
    try {
      return await addVersion(workflowId, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Version = createAsyncThunk(
  "Version/UpdateVersion",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateVersion(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Version = createAsyncThunk(
  "Version/DeleteVersion",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await deleteVersion(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const add_Execution = createAsyncThunk(
  "Version/addExecution",
  async ({ workflowId, payload }, { rejectWithValue }) => {
    try {
      return await addExecution(workflowId, payload);
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
      return rejectWithValue(
        error.response?.data?.error || {
          message: error.message,
          code: "UNKNOWN_ERROR",
        },
      );
    }
  },
);

export const getApprovalList = createAsyncThunk(
  "approval/fetchApproval",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchAllApproval(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addTasks = createAsyncThunk(
  "task/addTasks",
  async ({ workflowId, payload }, { rejectWithValue }) => {
    try {
      return await addTask(workflowId, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Tasks = createAsyncThunk(
  "task/UpdateTasks",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateTask(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Tasks = createAsyncThunk(
  "task/DeleteTasks",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTask(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTaskList = createAsyncThunk(
  "tasks/fetchTask",
  async ({ status, page, limit, search, priority }, { rejectWithValue }) => {
    try {
      return await fetcAllTask({ status, page, limit, search, priority });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
