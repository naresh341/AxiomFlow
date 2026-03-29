import { createSlice } from "@reduxjs/toolkit";
import { addTeams, delete_Teams, get_teams, update_Teams } from "../RTKThunk/RoleAndOrganizationThunk";
// import {
//   addTeams,
//   delete_Teams,
//   get_teams,
//   update_Teams,
// } from "../RTKThunk/AsyncThunk";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_teams.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_teams.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(get_teams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(addTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(update_Teams.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_Teams.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (team) => team.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(update_Teams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_Teams.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_Teams.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((team) => team.id !== action.payload);
      })
      .addCase(delete_Teams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamsSlice.reducer;
