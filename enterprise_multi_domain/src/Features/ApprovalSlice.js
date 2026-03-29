import { createSlice } from "@reduxjs/toolkit";
import { approve_reject, getApprovalList } from "../RTKThunk/WorkflowThunk";
// import { approve_reject, getApprovalList } from "../RTKThunk/AsyncThunk";

const initialState = {
  data: [],
  total: 0,
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

const ApprovalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApprovalList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApprovalList.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getApprovalList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approve_reject.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(approve_reject.pending, (state) => {
        state.loading = true;
      })
      .addCase(approve_reject.fulfilled, (state, action) => {
        state.loading = false;

        const processedId = action.meta.arg.approval_id;

        state.data = state.data.filter(
          (approval) => approval.id !== processedId,
        );

        state.total = state.total - 1;
        state.error = null;
      });
  },
});

export default ApprovalSlice.reducer;
