import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addExecution,
  addTask,
  addTeam,
  addUsers,
  addVersion,
  approveRejectTask,
  createFlag,
  createOrganization,
  createPolicy,
  CreateRisk,
  createRoles,
  createSecurity,
  deleteAuditlogs,
  deleteEvidence,
  deletePolicies,
  deleteRisk,
  deleteRoles,
  deleteSecurity,
  deleteTask,
  deleteTeam,
  DeleteUsers,
  deleteVersion,
  fetcAllTask,
  fetchAllApproval,
  fetchauditLogs,
  fetchComplianceStats,
  fetchControlEvidence,
  fetchGovernanceStatus,
  fetchPolicies,
  fetchRisks,
  fetchTeam,
  fetchUserOrg,
  ForgetPassword,
  getFlag,
  getOrganization,
  getRoles,
  getSecurity,
  getWorkflowApproval,
  getWorkflowExecutions,
  getWorkflowTasks,
  getWorkflowVersions,
  GovBreak_Glass,
  GovLock_Roles,
  GovOver_Ride,
  Login,
  LoginCredentials,
  PublishWorkflow,
  Register,
  ResetPassword,
  SendOTP,
  toggleFlag,
  updateAuditlogs,
  updateEvidence,
  updateFlag,
  updateOrganization,
  updatePolicies,
  updateRisk,
  updateRoles,
  updateSecurity,
  updateTask,
  updateTeam,
  updateUsers,
  updateVersion,
  uploadEvidence,
  uploadFileToServer,
  VerifyOTP,
  workflowById,
  WorkflowData,
} from "../Services/ApiService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await Login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const Login_Credentials = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LoginCredentials();
      return response;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch user");
    }
  },
);

export const RegisterUser = createAsyncThunk(
  "auth/Register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Register(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const Reset_Password = createAsyncThunk(
  "auth/ResetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await ResetPassword({ token, password });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const Forget_Password = createAsyncThunk(
  "auth/ForgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await ForgetPassword(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getWorkflow = createAsyncThunk(
  "workflows/fetchWorkflow",
  async (status, { rejectWithValue }) => {
    try {
      return await WorkflowData(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createWorkflow = createAsyncThunk(
  "workflow/create",
  async (flowdata, { rejectWithValue }) => {
    try {
      return await PublishWorkflow(flowdata);
    } catch (error) {
      const message = error.response.data.detail || error.message;
      return rejectWithValue(message);
    }
  },
);

export const getWorkflowById = createAsyncThunk(
  "workflow/workflow_id",
  async (id, { rejectWithValue }) => {
    try {
      return await workflowById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTaskList = createAsyncThunk(
  "tasks/fetchTask",
  async (status, { rejectWithValue }) => {
    try {
      return await fetcAllTask(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getApprovalList = createAsyncThunk(
  "approval/fetchApproval",
  async (status, { rejectWithValue }) => {
    try {
      return await fetchAllApproval(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const approve_reject = createAsyncThunk(
  "approval/ApproveOrRject",
  async (data, { rejectWithValue }) => {
    try {
      return await approveRejectTask(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_Workflow_Tasks = createAsyncThunk(
  `/workflow/fetchTasks`,
  async (data, { rejectWithValue }) => {
    try {
      return await getWorkflowTasks(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Versions = createAsyncThunk(
  `/workflow/fetchVersions`,
  async (data, { rejectWithValue }) => {
    try {
      return await getWorkflowVersions(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Executions = createAsyncThunk(
  `/workflow/fetchExecutions`,
  async (data, { rejectWithValue }) => {
    try {
      return await getWorkflowExecutions(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const get_Workflow_Approvals = createAsyncThunk(
  `/workflow/fetchApprovals`,
  async (data, { rejectWithValue }) => {
    try {
      return await getWorkflowApproval(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_UserOrg = createAsyncThunk(
  "user-org/Users",
  async (_, rejectWithValue) => {
    try {
      return await fetchUserOrg();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const get_teams = createAsyncThunk(
  "teams/teams",
  async (_, rejectWithValue) => {
    try {
      return await fetchTeam();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ================================================AUDIT LOGS==================================
export const get_auditLogs = createAsyncThunk(
  "governance/audit-Logs",
  async (actorType, rejectWithValue) => {
    try {
      return await fetchauditLogs(actorType);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_AuditLogs = createAsyncThunk(
  "governance/updateAuditLogs",
  async (data, { rejectWithValue }) => {
    try {
      const { id, ...payload } = data;

      const response = await updateAuditlogs(id, payload);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const delete_AuditLogs = createAsyncThunk(
  "governance/deleteAuditLogs",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteAuditlogs(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// =============================POLICIES====================================
export const getPolicies = createAsyncThunk(
  "compliance/fetchPolicies",
  async (status, { rejectWithValue }) => {
    try {
      return await fetchPolicies(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewPolicy = createAsyncThunk(
  "compliance/createPolicy",
  async (policyData, { rejectWithValue }) => {
    try {
      return await createPolicy(policyData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Policies = createAsyncThunk(
  "compliance/updatePolicies",
  async (data, { rejectWithValue }) => {
    try {
      const { id, ...payload } = data;

      const response = await updatePolicies(id, payload);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const delete_Policies = createAsyncThunk(
  "compliance/deletePolicies",
  async (id, { rejectWithValue }) => {
    try {
      return await deletePolicies(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ===========================RISK===================================
export const getRisks = createAsyncThunk(
  "compliance/fetchRisks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRisks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addRisk = createAsyncThunk(
  "compliance/identifyRisk",
  async (riskData, { rejectWithValue }) => {
    try {
      return await CreateRisk(riskData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Risk = createAsyncThunk(
  "compliance/updateRisk",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateRisk(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Risk = createAsyncThunk(
  "compliance/deleteRisk",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteRisk(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//================================= FETCH DASHBOARD STATS=====================
export const getComplianceStats = createAsyncThunk(
  "compliance/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchComplianceStats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//  =======================================EVIDENCE=============================================
export const getControlEvidence = createAsyncThunk(
  "compliance/fetchControlEvidence",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchControlEvidence();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const uploadControlEvidence = createAsyncThunk(
  "compliance/uploadEvidence",
  async ({ controlId, formData }, { rejectWithValue }) => {
    try {
      return await uploadEvidence(controlId, formData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const update_Evidence = createAsyncThunk(
  "compliance/updateEvidence",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateEvidence(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Evidence = createAsyncThunk(
  "compliance/deleteEvidence",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteEvidence(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//  =================================== USERS =========================
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

// ============================= Team ==========================================
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

// =====================================TASK===================================
export const addTasks = createAsyncThunk(
  "task/addTasks",
  async ({ workflowId, payload }, { rejectWithValue }) => {
    try {
      return await addTask(workflowId, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Tasks = createAsyncThunk(
  "task/UpdateTasks",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateTask(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Tasks = createAsyncThunk(
  "task/DeleteTasks",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTask(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ============================================== Version =================================================
export const add_Version = createAsyncThunk(
  "Version/addVersion",
  async ({ workflowId, payload }, { rejectWithValue }) => {
    try {
      return await addVersion(workflowId, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Version = createAsyncThunk(
  "Version/UpdateVersion",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateVersion(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const delete_Version = createAsyncThunk(
  "Version/DeleteVersion",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await deleteVersion(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ====================================Execution ============================================

export const add_Execution = createAsyncThunk(
  "Version/addExecution",
  async ({ workflowId, payload }, { rejectWithValue }) => {
    try {
      return await addExecution(workflowId, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ============================================== Roles and Organization=================================================

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
  async (id, { rejectWithValue }) => {
    try {
      console.log("ORG ID CHECK:", id);
      return await getRoles(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const create_Roles = createAsyncThunk(
  "Roles/createRoles",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await createRoles(id, payload);
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

// ======================== Security ===============================

export const get_Security = createAsyncThunk(
  "Security/getSecurity",
  async (id, { rejectWithValue }) => {
    try {
      console.log("ORG ID CHECK:", id);
      return await getSecurity(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const create_Security = createAsyncThunk(
  "Security/createSecurity",
  async ({ id, ip }, { rejectWithValue }) => {
    try {
      return await createSecurity(id, ip);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const update_Security = createAsyncThunk(
  "Security/updateSecurity",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateSecurity(id, payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const delete_Security = createAsyncThunk(
  "Security/deleteSecurity",
  async ({ id, ip }, { rejectWithValue }) => {
    try {
      await deleteSecurity(id, ip);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ======================================== Feature Flag==============================

export const get_Flag = createAsyncThunk(
  "FeatureFlag/getFlag",
  async (_, { rejectWithValue }) => {
    try {
      return await getFlag();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const create_Flag = createAsyncThunk(
  "FeatureFlag/createFlag",
  async (payload, { rejectWithValue }) => {
    try {
      return await createFlag(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const toggle_Flag = createAsyncThunk(
  "FeatureFlag/toggleFlag",
  async (id, { rejectWithValue }) => {
    try {
      return await toggleFlag(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const update_Flag = createAsyncThunk(
  "FeatureFlag/updateFlag",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateFlag(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ===================================== Governance ===========================

export const OverRideAction = createAsyncThunk(
  "Governance/overRide",
  async (payload, { rejectWithValue }) => {
    try {
      return await GovOver_Ride(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const LockRolesAction = createAsyncThunk(
  "Governance/LockRoles",
  async (payload, { rejectWithValue }) => {
    try {
      return await GovLock_Roles(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const BreakGlassAction = createAsyncThunk(
  "Governance/BreakGlass",
  async (payload, { rejectWithValue }) => {
    try {
      return await GovBreak_Glass(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const Send_OTP = createAsyncThunk(
  "OTP/send",
  async (payload, { rejectWithValue }) => {
    try {
      return await SendOTP(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const Verify_OTP = createAsyncThunk(
  "OTP/verify",
  async (payload, { rejectWithValue }) => {
    try {
      return await VerifyOTP(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchStatus = createAsyncThunk(
  "governance/status",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchGovernanceStatus();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
