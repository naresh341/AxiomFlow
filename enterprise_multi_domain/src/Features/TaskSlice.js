import { createSlice } from "@reduxjs/toolkit";
import { getTaskList } from "../RTKThunk/AsyncThunk";

const initialState = {
  error: null,
  loading: false,
  data: [],
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
        state.data = action.payload;
      })
      .addCase(getTaskList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TaskSlice.reducer;
