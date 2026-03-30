import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  delete_User,
  get_UserOrg,
  update_User,
} from "../RTKThunk/RoleAndOrganizationThunk";

const initialState = {
  data: [],
  error: null,
  loading: false,
  total: 0,
  page: 1,
  totalPages: 0,
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
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(get_UserOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(update_User.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_User.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(update_User.rejected, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(delete_User.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_User.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((user) => user.id !== action.payload);
      })
      .addCase(delete_User.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default User_OrgSlice.reducer;
