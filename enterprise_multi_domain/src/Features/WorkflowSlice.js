import { createSlice } from "@reduxjs/toolkit";
import {
  add_Execution,
  add_Version,
  createWorkflow,
  delete_Version,
  get_Workflow_Approvals,
  get_Workflow_Executions,
  get_Workflow_Tasks,
  get_Workflow_Versions,
  getWorkflow,
  getWorkflowById,
  update_Version,
} from "../RTKThunk/WorkflowThunk";

const WorkflowSlice = createSlice({
  name: "workflow",
  initialState: {
    data: [],
    loading: false,
    error: null,
    currentWorkflow: null,
    currentWorkflowTasks: [],
    currentWorkflowApprovals: [],
    currentWorkflowVersions: [],
    currentWorkflowExecutions: [],
    total: 0,
    page: 1,
    totalPages: 0,
  },
  reducers: {
    clearCurrentWorkflow: (state) => {
      state.currentWorkflow = null;
      state.currentWorkflowTasks = [];
      state.currentWorkflowVersions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkflow.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkflow.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getWorkflow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // for the create Workflow
      .addCase(createWorkflow.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkflow.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.currentWorkflow = action.payload;
      })
      .addCase(createWorkflow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //for The detail workflowSlice
      .addCase(getWorkflowById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkflowById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflow = action.payload;
      })
      .addCase(getWorkflowById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //for The detail workflowTask
      .addCase(get_Workflow_Tasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Workflow_Tasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(get_Workflow_Tasks.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflowTasks = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(get_Workflow_Approvals.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Workflow_Approvals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(get_Workflow_Approvals.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflowApprovals = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(get_Workflow_Versions.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Workflow_Versions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(get_Workflow_Versions.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflowVersions = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(get_Workflow_Executions.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Workflow_Executions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(get_Workflow_Executions.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflowExecutions = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(add_Version.pending, (state) => {
        state.loading = true;
      })
      .addCase(add_Version.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflowVersions.unshift(action.payload);
      })
      .addCase(add_Version.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(update_Version.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Version.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.currentWorkflowVersions.data.findIndex(
          (version) => version.id === action.payload.id,
        );
        if (index !== -1) {
          state.currentWorkflowVersions[index] = action.payload;
        }
      })
      .addCase(update_Version.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_Version.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_Version.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflowVersions = state.currentWorkflowVersions.filter(
          (version) => version.id !== action.payload,
        );
      })
      .addCase(delete_Version.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(add_Execution.pending, (state) => {
        state.loading = true;
      })
      .addCase(add_Execution.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflowExecutions.unshift(action.payload);
      })
      .addCase(add_Execution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default WorkflowSlice.reducer;
