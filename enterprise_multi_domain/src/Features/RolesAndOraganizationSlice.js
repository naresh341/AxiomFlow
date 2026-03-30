import { createSlice } from "@reduxjs/toolkit";
import {
  create_Organization,
  create_Roles,
  delete_Roles,
  get_Organization,
  get_Roles,
  update_Organization,
  update_Roles,
} from "../RTKThunk/RoleAndOrganizationThunk";

const initialState = {
  roles: [],
  org: [],
  loading: false,
  error: null,
  selectedOrg: null,
  total: 0,
  page: 1,
  totalPages: 0,
};

const RolesAndOraganization = createSlice({
  name: "roleOrg",
  initialState,
  reducers: {
    setSelectedOrg: (state, action) => {
      state.selectedOrg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_Organization.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Organization.fulfilled, (state, action) => {
        state.loading = false;
        state.org = action.payload;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(get_Organization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(create_Organization.pending, (state) => {
        state.loading = true;
      })
      .addCase(create_Organization.fulfilled, (state, action) => {
        state.loading = false;
        state.org.unshift(action.payload);
      })
      .addCase(create_Organization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(update_Organization.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Organization.fulfilled, (state, action) => {
        state.loading = false;
        state.org = action.payload;
      })
      .addCase(update_Organization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(get_Roles.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Roles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(get_Roles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(create_Roles.pending, (state) => {
        state.loading = true;
      })
      .addCase(create_Roles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.unshift(action.payload);
      })
      .addCase(create_Roles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(update_Roles.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Roles.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex(
          (roles) => roles.id === action.payload.id,
        );
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(update_Roles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_Roles.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_Roles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter(
          (roles) => roles.id !== action.payload,
        );
      })
      .addCase(delete_Roles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default RolesAndOraganization.reducer;
