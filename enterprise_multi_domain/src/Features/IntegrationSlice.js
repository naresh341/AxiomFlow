import { createSlice } from "@reduxjs/toolkit";
import {
  connectIntegrationThunk,
  createIntegrationThunk,
  disconnectIntegrationThunk,
  fetchIntegrationsThunk,
  fetchUserIntegrationsThunk,
  saveMappingThunk,
} from "../RTKThunk/IntegrationThunk";
// import {
//   fetchIntegrationsThunk,
//   connectIntegrationThunk,
//   disconnectIntegrationThunk,
//   fetchUserIntegrationsThunk,
//   createIntegrationThunk,
//   saveMappingThunk,
// } from "../RTKThunk/AsyncThunk";

const initialState = {
  integrations: [],
  userIntegrations: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  totalPages: 0,
};

const integrationSlice = createSlice({
  name: "integration",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchIntegrationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIntegrationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.integrations = action.payload;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchIntegrationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createIntegrationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIntegrationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.integrations.push(action.payload);
      })
      .addCase(createIntegrationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveMappingThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveMappingThunk.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload;

        const index = state.userIntegrations.findIndex(
          (item) => item.id === updated.id,
        );

        if (index !== -1) {
          state.userIntegrations[index] = updated;
        }
      })
      .addCase(saveMappingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CONNECT
      .addCase(connectIntegrationThunk.fulfilled, (state, action) => {
        const existing = state.userIntegrations.find(
          (item) => item.integration_id === action.payload.integration_id,
        );

        if (existing) {
          existing.status = action.payload.status;
        } else {
          state.userIntegrations.push(action.payload);
        }
      })

      // DISCONNECT
      .addCase(disconnectIntegrationThunk.fulfilled, (state, action) => {
        const existing = state.userIntegrations.find(
          (item) => item.integration_id === action.payload.integration_id,
        );

        if (existing) {
          existing.status = "disconnected";
        }
      })
      // USER INTEGRATIONS
      .addCase(fetchUserIntegrationsThunk.fulfilled, (state, action) => {
        state.userIntegrations = action.payload;
      });
  },
});

export default integrationSlice.reducer;
