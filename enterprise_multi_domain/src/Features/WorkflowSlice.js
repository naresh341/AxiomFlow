import { createSlice } from "@reduxjs/toolkit";
import {
  createWorkflow,
  get_Workflow_Approvals,
  get_Workflow_Executions,
  get_Workflow_Tasks,
  get_Workflow_Versions,
  getWorkflow,
  getWorkflowById,
} from "../RTKThunk/AsyncThunk";

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
        console.log("SUCCESS! Data received:", action.payload);
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
        state.currentWorkflowTasks = action.payload;
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
        state.currentWorkflowApprovals = action.payload;
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
        state.currentWorkflowVersions = action.payload;
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
        state.currentWorkflowExecutions = action.payload;
      });
  },
});

export default WorkflowSlice.reducer;
