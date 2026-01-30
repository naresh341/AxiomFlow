import { createSlice } from "@reduxjs/toolkit";
import { getWorkflow } from "../RTKThunk/AsyncThunk";

const WorkflowSlice = createSlice({
  name: "workflow",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
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
      });
  },
});

export default WorkflowSlice.reducer;
