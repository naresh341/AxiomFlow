import { createSlice } from "@reduxjs/toolkit";
import { get_teams } from "../RTKThunk/AsyncThunk";

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
      });
  },
});

export default teamsSlice.reducer;
