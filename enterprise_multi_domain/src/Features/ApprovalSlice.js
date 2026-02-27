import { createSlice } from "@reduxjs/toolkit";
import { approve_reject, getApprovalList } from "../RTKThunk/AsyncThunk";

const initialState = {
  data: [],
  error: null,
  loading: false,
  
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
        state.data = action.payload;
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
        state.data.data = state.data.data.filter(
          (approval) => approval.id !== processedId,
        );
        state.data.total = state.data.total - 1;
        state.error = null;
      });
  },
});

export default ApprovalSlice.reducer;
