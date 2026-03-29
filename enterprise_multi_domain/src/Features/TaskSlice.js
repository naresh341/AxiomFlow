import { createSlice } from "@reduxjs/toolkit";
import {
  addTasks,
  delete_Tasks,
  getTaskList,
  update_Tasks,
} from "../RTKThunk/WorkflowThunk";

const initialState = {
  error: null,
  loading: false,
  data: [],
  total: 0,
  page: 1,
  totalPages: 0,
};

const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getTaskList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(addTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(update_Tasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Tasks.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(update_Tasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_Tasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_Tasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((data) => data.id !== action.payload);
      })
      .addCase(delete_Tasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TaskSlice.reducer;
