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
import roleOrgReducer from "../Features/RolesAndOraganizationSlice.js";
import securityReducer from "../Features/SecuritySlice.js";
import flagReducer from "../Features/FeatureFlagSlice.js";
import otpReducer from "../Features/OTPSlice.js";
import GovActionReducer from "../Features/GovernanceActionSlice.js";
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
    roleOrg: roleOrgReducer,
    security: securityReducer,
    flags: flagReducer,
    otp: otpReducer,
    GovAction: GovActionReducer,
  },
});
