import { configureStore } from "@reduxjs/toolkit";
import islogin from "../Features/LoginSlice";
import tableData from "../Features/TableSlice";

export const Store = configureStore({
  reducer: {
    islogin: islogin,
    table: tableData,
  },
});
