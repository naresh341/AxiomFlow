import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTeam,
  addUsers,
  createOrganization,
  createRoles,
  deleteRoles,
  deleteTeam,
  DeleteUsers,
  fetchTeam,
  fetchUserOrg,
  getOrganization,
  getRoles,
  updateOrganization,
  updateRoles,
  updateTeam,
  updateUsers,
  uploadFileToServer,
} from "../Services/ApiService";

export const get_Organization = createAsyncThunk(
  "Organization/getOrganization",
  async (id, { rejectWithValue }) => {
    try {
      return await getOrganization(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const create_Organization = createAsyncThunk(
  "org/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createOrganization(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const update_Organization = createAsyncThunk(
  "Organization/updateOrganization",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateOrganization(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_Roles = createAsyncThunk(
  "Roles/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      return await getRoles();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const create_Roles = createAsyncThunk(
  "Roles/createRoles",
  async (payload, { rejectWithValue }) => {
    try {
      return await createRoles(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const update_Roles = createAsyncThunk(
  "Roles/updateRoles",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateRoles(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const delete_Roles = createAsyncThunk(
  "Roles/deleteRoles",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoles(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const upload_FileTo_Server = createAsyncThunk(
  "upload/file",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await uploadFileToServer(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addTeams = createAsyncThunk(
  "teams/addTeam",
  async (payload, { rejectWithValue }) => {
    try {
      return await addTeam(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const update_Teams = createAsyncThunk(
  "teams/updateTeam",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateTeam(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Teams = createAsyncThunk(
  "teams/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTeam(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_teams = createAsyncThunk(
  "teams/teams",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      return await fetchTeam({ page, limit });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addUser = createAsyncThunk(
  "user-org/addUsers",
  async (payload, { rejectWithValue }) => {
    try {
      return await addUsers(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const update_User = createAsyncThunk(
  "user-org/UpdateUsers",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateUsers(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_User = createAsyncThunk(
  "user-org/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      return await DeleteUsers(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_UserOrg = createAsyncThunk(
  "user-org/Users",
  async ({ page, limit, search, status }, { rejectWithValue }) => {
    try {
      return await fetchUserOrg({ page, limit, search, status });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
