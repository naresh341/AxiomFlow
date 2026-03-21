import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
// ========================================== LOGIN ===========================================
export const Login = async ({ username, password }) => {
  try {
    const response = await axios.post("/auth/login", { username, password });
    console.log(response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("API Login Error", error);
    throw error;
  }
};
export const Register = async (payload) => {
  try {
    const response = await axios.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    console.error("API Register Error", error);
    throw error;
  }
};
export const ForgetPassword = async (email) => {
  try {
    const response = await axios.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("API forgot Password Error", error);
    throw error.response?.data?.detail || "Something went wrong";
  }
};

export const ResetPassword = async ({ token, password }) => {
  try {
    const response = await axios.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("API Reset Password Error", error);
    throw error.response?.data?.detail || "Something went wrong";
  }
};

export const LoginCredentials = async (token) => {
  try {
    const response = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    throw error.response?.data?.detail || "Auth failed";
  }
};

// ========================================WORKFLOW===================================================
export const WorkflowData = async (status = "active") => {
  try {
    const response = await axios.get("/workflows/fetchAll", {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error(error, "Error While fetching Workflow Data");
    throw error;
  }
};

export const PublishWorkflow = async (WorkflowData) => {
  try {
    const response = await axios.post("/workflows/create", WorkflowData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const workflowById = async (workflow_id) => {
  try {
    const response = await axios.get(`/workflows/${workflow_id}`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching Data", error);
    throw error;
  }
};

export const fetcAllTask = async (status) => {
  try {
    const response = await axios.get("/tasks/fetchAll", {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error("Unable to Fetch Task Data", error);
    throw error;
  }
};

export const fetchAllApproval = async (status) => {
  try {
    const response = await axios.get("/approval/fetchAll", {
      params: {
        status,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while Fetching Approval Data", error);
    throw error;
  }
};

export const approveRejectTask = async (data) => {
  try {
    const response = await axios.post("/approval/decide", data);
    return response.data;
  } catch (error) {
    console.error("Error while Approving/Rejecting Task", error);
    throw error;
  }
};

export const getWorkflowTasks = async (workflowById) => {
  try {
    const response = await axios.get(`/workflows/${workflowById}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching workflow tasks", error);
    throw error;
  }
};
export const getWorkflowApproval = async (workflowById) => {
  try {
    const response = await axios.get(`/workflows/${workflowById}/approvals`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching workflow approvals", error);
    throw error;
  }
};
export const getWorkflowVersions = async (workflowById) => {
  try {
    const response = await axios.get(`/workflows/${workflowById}/versions`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching workflow versions", error);
    throw error;
  }
};
export const getWorkflowExecutions = async (workflowById) => {
  try {
    const response = await axios.get(`/workflows/${workflowById}/executions`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching workflow executions", error);
    throw error;
  }
};

export const fetchUserOrg = async () => {
  try {
    const response = await axios.get("/user-org/fetchAll");
    return response.data;
  } catch (error) {
    console.error("Error while fetching User-Org data", error);
    throw error;
  }
};
export const fetchTeam = async () => {
  try {
    const response = await axios.get("/teams/fetchAll");
    return response.data;
  } catch (error) {
    console.error("Error while fetching Team data", error);
    throw error;
  }
};

// ========================== AUDIT LOGS==================================================
export const fetchauditLogs = async (actorType = null) => {
  try {
    const response = await axios.get(
      `/governance/audit-logs?actor_type=${actorType}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching Audit Logs data", error);
    throw error;
  }
};

export const updateAuditlogs = async (id, payload) => {
  try {
    const response = await axios.put(`/governance/audit-logs/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Updating Audit Logs", error);
    throw error;
  }
};
export const deleteAuditlogs = async (id) => {
  try {
    const response = await axios.delete(`/governance/audit-logs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error While Deleting AuditLogs", error);
    throw error;
  }
};

// ================================POLICIES============================================
export const fetchPolicies = async (status = null) => {
  try {
    const url = status
      ? `/compliance/policies?status=${status}`
      : "/compliance/policies";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error while fetching Policies", error);
    throw error;
  }
};

export const createPolicy = async (policyData) => {
  try {
    const response = await axios.post("/compliance/policies", policyData);
    return response.data.data;
  } catch (error) {
    console.error("Error while creating Policy", error);
    throw error;
  }
};

export const updatePolicies = async (id, payload) => {
  try {
    const response = await axios.put(
      `/compliance/updatePolicies/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error While Adding Team", error);
    throw error;
  }
};
export const deletePolicies = async (id) => {
  try {
    const response = await axios.delete(`/compliance/deletePolicies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Team", error);
    throw error;
  }
};

//=========================================== RISK MANAGEMENT====================================
export const fetchRisks = async () => {
  try {
    const response = await axios.get("/compliance/risks");
    return response.data;
  } catch (error) {
    console.error("Error while fetching Risks", error);
    throw error;
  }
};

export const CreateRisk = async (riskData) => {
  try {
    const response = await axios.post("/compliance/risks", riskData);
    return response.data;
  } catch (error) {
    console.error("Error while identifying Risk", error);
    throw error;
  }
};

export const updateRisk = async (id, payload) => {
  try {
    const response = await axios.put(`/compliance/updateRisks/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Updating Team", error);
    throw error;
  }
};
export const deleteRisk = async (id) => {
  try {
    const response = await axios.delete(`/compliance/deleteRisks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error While Deleting Risk", error);
    throw error;
  }
};

// ========================= EVIDENCE & CONTROLS ========================
export const fetchControlEvidence = async () => {
  try {
    const response = await axios.get(`/compliance/controls/evidence`);
    return response.data;
  } catch (error) {
    console.error(`Error while fetching evidence for control `, error);
    throw error;
  }
};

export const uploadEvidence = async (controlId, formData) => {
  try {
    // Note: formData must be used for File uploads
    const response = await axios.post(
      `/compliance/controls/${controlId}/evidence`,
      formData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while uploading evidence", error);
    throw error;
  }
};

export const updateEvidence = async (id, payload) => {
  try {
    const response = await axios.put(`/controls/updateEvidence/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Updating Evidence", error);
    throw error;
  }
};

export const deleteEvidence = async (id) => {
  try {
    const response = await axios.delete(
      `/compliance/controls/deleteEvidence/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error While Deleting Evidence", error);
    throw error;
  }
};

// ============================= DASHBOARD STATS=======================
export const fetchComplianceStats = async () => {
  try {
    const response = await axios.get("/compliance/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Error while fetching dashboard stats", error);
    throw error;
  }
};
// ==================================Users=====================================
export const addUsers = async (payload) => {
  try {
    const response = await axios.post("/user-org/addUsers", payload);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Users", error);
    throw error;
  }
};

export const updateUsers = async (id, payload) => {
  try {
    const response = await axios.put(`/user-org/updateUser/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Users", error);
    throw error;
  }
};

export const DeleteUsers = async (id) => {
  try {
    await axios.delete(`/user-org/deleteUser/${id}`);
    return id;
  } catch (error) {
    console.error("Error While Adding Users", error);
    throw error;
  }
};

// =================================Teams==================================
export const addTeam = async (payload) => {
  try {
    const response = await axios.post("/teams/createTeam", payload);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Team", error);
    throw error;
  }
};
export const updateTeam = async (id, payload) => {
  try {
    const response = await axios.put(`/teams/updateTeam/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Team", error);
    throw error;
  }
};
export const deleteTeam = async (id) => {
  try {
    const response = await axios.delete(`/teams/deleteTeam/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Team", error);
    throw error;
  }
};

// ===================================Task=================================

export const addTask = async (id, payload) => {
  try {
    const response = await axios.post(`/workflows/${id}/tasks`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Task", error);
    throw error;
  }
};
export const updateTask = async (id, payload) => {
  try {
    const response = await axios.put(`/workflows/tasksUpdate/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Update Task", error);
    throw error;
  }
};
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`/workflows/deletetasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error While Deleting Task", error);
    throw error;
  }
};

// ============================================== Worflow Version =================================================
export const addVersion = async (id, payload) => {
  try {
    const response = await axios.post(
      `/workflows/${id}/createVersions`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error While Adding Version", error);
    throw error;
  }
};
export const updateVersion = async (id, payload) => {
  try {
    const response = await axios.put(
      `/workflows/${id}/updateVersions`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error While Update Version", error);
    throw error;
  }
};
export const deleteVersion = async (id) => {
  try {
    const response = await axios.delete(`/workflows/${id}/deleteVersion`);
    return response.data;
  } catch (error) {
    console.error("Error While Deleting Task", error);
    throw error;
  }
};

// ==============================================Execution ==============================================
export const addExecution = async (id, payload) => {
  try {
    const response = await axios.post(`/workflows/${id}/executions`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Execution", error);
    throw error;
  }
};
// export const updateVersion = async (id, payload) => {
//   try {
//     const response = await axios.put(
//       `/workflows/${id}/updateVersions`,
//       payload,
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error While Update Version", error);
//     throw error;
//   }
// };
// export const deleteVersion = async (id) => {
//   try {
//     const response = await axios.delete(`/workflows/${id}/deleteVersion`);
//     return response.data;
//   } catch (error) {
//     console.error("Error While Deleting Task", error);
//     throw error;
//   }
// };

// ============================================== Roles and Organization=================================================
export const getOrganization = async (id) => {
  try {
    console.log("ORG ID CHECK:", id);
    const response = await axios.get(`/rolesAndOrg/organization/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error While Fetching  Organization", error);
    throw error;
  }
};

export const createOrganization = async (payload) => {
  try {
    const res = await axios.post("/rolesAndOrg/createOrganization", payload);
    return res.data;
  } catch (err) {
    console.error("Error creating org", err);
    throw err;
  }
};
export const updateOrganization = async (id, payload) => {
  try {
    const response = await axios.put(
      `/rolesAndOrg/updateOrganization/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error While Fetching  Organization", error);
    throw error;
  }
};
export const getRoles = async (id) => {
  try {
    const response = await axios.get(`/rolesAndOrg/${id}/roles`);
    return response.data;
  } catch (error) {
    console.error("Error While Fetching  Organization", error);
    throw error;
  }
};
export const createRoles = async (id, payload) => {
  try {
    const response = await axios.post(
      `/rolesAndOrg/${id}/rolesCreate`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error While Fetching  Organization", error);
    throw error;
  }
};

export const updateRoles = async (id, payload) => {
  try {
    const response = await axios.put(`/rolesAndOrg/updateRoles/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Updating  Roles", error);
    throw error;
  }
};

export const deleteRoles = async (id) => {
  try {
    const response = await axios.delete(`/rolesAndOrg/deleteRoles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error While deleting  Roles", error);
    throw error;
  }
};

export const uploadFileToServer = async (payload) => {
  try {
    const formData = new FormData();

    formData.append("file", payload.file);
    formData.append("org_id", payload.orgId);
    formData.append("asset_type", "logos");

    // 🔍 Debug
    console.log("FILE:", formData.get("file"));
    console.log("ORG:", formData.get("org_id"));

    const res = await axios.post("/upload/logo", formData);

    return res.data;
  } catch (error) {
    console.error("Error while Uploading File", error);
    throw error;
  }
};

// ============================= Security ==========================

export const getSecurity = async (id) => {
  try {
    const response = await axios.get(`/security/getSecurity/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error While Fetching  Security", error);
    throw error;
  }
};
export const createSecurity = async (id, ip) => {
  try {
    const response = await axios.post(`/security/${id}/network/ip`, null, {
      params: { ip },
    });
    return response.data;
  } catch (error) {
    console.error("Error While Creating Security", error);
    throw error;
  }
};

export const updateSecurity = async (id, payload) => {
  try {
    const response = await axios.put(`/security/UpdateSecurity/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error While Updating  Security", error);
    throw error;
  }
};

export const deleteSecurity = async (id, ip) => {
  try {
    const response = await axios.delete(`/security/${id}/network/ip`, {
      params: { ip },
    });
    return response.data;
  } catch (error) {
    console.error("Error While Deleting Security", error);
    throw error;
  }
};

// ==================================== Feature Flag =================================

export const getFlag = async () => {
  try {
    const response = await axios.get(`/feature-flags/fetchFeatureFlag`);
    return response.data;
  } catch (error) {
    console.error("Error While Fetching  Flag", error);
    throw error;
  }
};
export const createFlag = async (payload) => {
  try {
    const response = await axios.post(
      `/feature-flags/createFeatureFlag`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error While Creating Flag", error);
    throw error;
  }
};

export const toggleFlag = async (id) => {
  try {
    const response = await axios.patch(`/feature-flags/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error("Error While Toggle  Flag", error);
    throw error;
  }
};
export const updateFlag = async (id, payload) => {
  try {
    const response = await axios.patch(
      `/feature-flags/updateFeatureFlag/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error While Updating  Flag", error);
    throw error;
  }
};

// ======================================= Governance ========================

export const GovOver_Ride = async (data) => {
  try {
    const response = await axios.post("/governance/override", data);
    return response.data;
  } catch (error) {
    console.error("Error while identifying Risk", error);
    throw error;
  }
};
export const GovLock_Roles = async (data) => {
  try {
    const response = await axios.post("/governance/lock-roles", data);
    return response.data;
  } catch (error) {
    console.error("Error while identifying Risk", error);
    throw error;
  }
};
export const GovBreak_Glass = async (data) => {
  try {
    const response = await axios.post("/governance/break-glass", data);
    return response.data;
  } catch (error) {
    console.error("Error while identifying Risk", error);
    throw error;
  }
};
export const SendOTP = async (data) => {
  try {
    const response = await axios.post("/otp/send", data);
    return response.data;
  } catch (error) {
    console.error("Error while OTP", error);
    throw error;
  }
};
export const VerifyOTP = async (data) => {
  try {
    const response = await axios.post("/otp/verify", data);
    return response.data;
  } catch (error) {
    console.error("Error while identifying Risk", error);
    throw error;
  }
};

export const fetchGovernanceStatus = async () => {
  try {
    const res = await axios.get("/governance/status");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
