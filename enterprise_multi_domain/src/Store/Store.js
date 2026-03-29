import { configureStore } from "@reduxjs/toolkit";
import approvalReducer from "../Features/ApprovalSlice.js";
import ComplianceReducer from "../Features/complianceSlice.js";
import flagReducer from "../Features/FeatureFlagSlice.js";
import GovActionReducer from "../Features/GovernanceActionSlice.js";
import GovernanceReducer from "../Features/GovernanceSlice.js";
import IntegrationReducer from "../Features/IntegrationSlice.js";
import islogin from "../Features/LoginSlice";
import NotificationReducer from "../Features/NotificationSlice.js";
import OrganizationReducer from "../Features/OrganizationSlice.js";
import otpReducer from "../Features/OTPSlice.js";
import roleOrgReducer from "../Features/RolesAndOraganizationSlice.js";
import securityReducer from "../Features/SecuritySlice.js";
import tableData from "../Features/TableSlice";
import taskReducer from "../Features/TaskSlice.js";
import teamsReducer from "../Features/TeamSlice.js";
import UserOrgReducer from "../Features/User_OrgSlice.js";
import workflows from "../Features/WorkflowSlice";
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
    organization: OrganizationReducer,
    integration: IntegrationReducer,
    notification: NotificationReducer,
  },
});
