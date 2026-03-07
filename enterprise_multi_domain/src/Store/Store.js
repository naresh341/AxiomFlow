import { configureStore } from "@reduxjs/toolkit";
import islogin from "../Features/LoginSlice";
import tableData from "../Features/TableSlice";
import workflows from "../Features/WorkflowSlice";
import taskReducer from "../Features/TaskSlice.js";
import approvalReducer from "../Features/ApprovalSlice.js";
import UserOrgReducer from "../Features/User_OrgSlice.js";
import teamsReducer from "../Features/TeamSlice.js";
import GovernanceReducer from "../Features/GovernanceSlice.js";
import ComplianceReducer from "../Features/complianceSlice.js";
export const Store = configureStore({
  reducer: {
    islogin: islogin,
    table: tableData,
    workflows: workflows,
    task: taskReducer,
    approval: approvalReducer,
    UserOrg: UserOrgReducer,
    teams: teamsReducer,
    governance: GovernanceReducer,
    compliance: ComplianceReducer,
  },
});
