import { configureStore } from "@reduxjs/toolkit";
import islogin from "../Features/LoginSlice";
import tableData from "../Features/TableSlice";
import workflows from "../Features/WorkflowSlice";
export const Store = configureStore({
  reducer: {
    islogin: islogin,
    table: tableData,
    workflows: workflows,
  },
});
