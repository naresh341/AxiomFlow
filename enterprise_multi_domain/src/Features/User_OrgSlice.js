import { createSlice } from "@reduxjs/toolkit";
import { get_UserOrg } from "../RTKThunk/AsyncThunk";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const User_OrgSlice = createSlice({
  name: "UserOrg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_UserOrg.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_UserOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(get_UserOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default User_OrgSlice.reducer;
