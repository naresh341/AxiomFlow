import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  type: null, // "success" | "error"
  message: "",
  code: "",
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.code = action.payload.code || "";
    },
    hideNotification: (state) => {
      state.open = false;
      state.type = null;
      state.message = "";
      state.code = "";
    },
  },
});

export const { showNotification, hideNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
