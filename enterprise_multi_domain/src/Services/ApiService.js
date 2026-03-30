import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
// ========================================== Interceptor ===========================================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    // If 401 and we haven't retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      // If we are already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axios(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to get a new access token
        await axios.post("/auth/refresh");

        isRefreshing = false;
        processQueue(null); // Resolve all queued requests

        return axios(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        // 🚨 CRITICAL: Refresh failed. The user MUST log in again.
        console.error("Refresh token expired. Logging out...");

        // Clear Redux/Storage here if possible, or just redirect
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
// ========================================== LOGIN ===========================================
export const loginApi = async ({ username, password }) => {
  try {
    const response = await axios.post("/auth/login", { username, password });
    return response.data.user;
  } catch (error) {
    console.error("API Login Error", error);
    throw error;
  }
};
export const Logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("API Logout Error", error);
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

export const LoginCredentials = async () => {
  try {
    const response = await axios.get("/auth/me");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    throw error.response?.data?.detail || "Auth failed";
  }
};

// ========================================WORKFLOW===================================================
export const WorkflowData = async (params) => {
  try {
    const response = await axios.get("/workflows/fetchAll", {
      params: {
        status: params.activeTab,
        page: params.page,
        limit: params.limit,
        search: params.search,
      },
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

export const fetcAllTask = async ({
  status,
  page = 1,
  limit = 10,
  search = "",
  priority = "All",
}) => {
  try {
    const response = await axios.get("/tasks/fetchAll", {
      params: { status, page, limit, search, priority },
    });
    return response.data;
  } catch (error) {
    console.error("Unable to Fetch Task Data", error);
    throw error;
  }
};

export const fetchAllApproval = async ({
  status,
  page = 1,
  limit = 10,
  search = "",
  priority = "",
  date = "",
}) => {
  try {
    const response = await axios.get("/approval/fetchAll", {
      params: {
        status,
        page,
        limit,
        search,
        priority,
        date,
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

export const getWorkflowTasks = async ({
  workflowId,
  page = 1,
  limit = 10,
  status,
  priority,
  search,
}) => {
  try {
    const response = await axios.get(`/workflows/${workflowId}/tasks`, {
      params: { page, limit, status, priority, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching workflow tasks", error);
    throw error;
  }
};
export const getWorkflowApproval = async ({
  workflowId,
  page = 1,
  limit = 10,
  status,
  priority,
  search,
}) => {
  try {
    const response = await axios.get(`/workflows/${workflowId}/approvals`, {
      params: { page, limit, status, priority, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching workflow approvals", error);
    throw error;
  }
};
export const getWorkflowVersions = async ({
  workflowId,
  page = 1,
  limit = 10,
  status,
  search,
}) => {
  try {
    const response = await axios.get(`/workflows/${workflowId}/versions`, {
      params: { page, limit, status, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching workflow versions", error);
    throw error;
  }
};
export const getWorkflowExecutions = async ({
  workflowId,
  page = 1,
  limit = 10,
  status,
  search,
}) => {
  try {
    const response = await axios.get(`/workflows/${workflowId}/executions`, {
      params: { page, limit, status, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching workflow executions", error);
    throw error;
  }
};

export const fetchUserOrg = async ({
  page = 1,
  limit = 10,
  search,
  status,
}) => {
  try {
    const response = await axios.get("/user-org/fetchAll", {
      params: { page, limit, search, status },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching User-Org data", error);
    throw error;
  }
};
export const fetchTeam = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await axios.get("/teams/fetchAll", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching Team data", error);
    throw error;
  }
};

// ========================== AUDIT LOGS==================================================
export const fetchauditLogs = async ({
  page = 1,
  limit = 10,
  actor_type,
  status,
  search,
}) => {
  try {
    const response = await axios.get("/governance/audit-logs", {
      params: {
        page,
        limit,
        actor_type,
        status,
        search,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while fetching Audit Logs", error);
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
export const fetchPolicies = async ({
  page = 1,
  limit = 10,
  status = null,
}) => {
  try {
    const response = await axios.get("/compliance/policies", {
      params: {
        page,
        limit,
        status,
      },
    });

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
export const fetchRisks = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await axios.get("/compliance/risks", {
      params: {
        page,
        limit,
      },
    });

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
export const fetchControlEvidence = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await axios.get("/compliance/controls/evidence", {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while fetching evidence", error);
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
export const getRoles = async () => {
  try {
    const response = await axios.get(`/rolesAndOrg/roles`);
    return response.data;
  } catch (error) {
    console.error("Error While Fetching  Organization", error);
    throw error;
  }
};

export const createRoles = async (payload) => {
  try {
    const response = await axios.post(`/rolesAndOrg/rolesCreate`, payload);
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
// ============================== Organization=======================

export const fetchOrganization = async () => {
  try {
    const response = await axios.get(`/organization/fetchOrganization`);
    return response.data;
  } catch (error) {
    console.error("Error While Fetching  Security", error);
    throw error;
  }
};
export const updateOrg = async (data) => {
  try {
    const response = await axios.put(`/organization/updateOrganization`, data);
    return response.data;
  } catch (error) {
    console.error("Error While Creating Security", error);
    throw error;
  }
};

export const uploadlogo = async (payload) => {
  try {
    const formData = new FormData();
    formData.append("file", payload.file);
    const res = await axios.post("/organization/logo", formData);
    return res.data;
  } catch (error) {
    console.error("Error while Uploading File", error);
    throw error;
  }
};

export const fetchSubscription = async () => {
  try {
    const response = await axios.get(`/organization/fetchSubscription`);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Subscription", error);
    throw error;
  }
};
export const updateSubscription = async (data) => {
  try {
    const response = await axios.put(`/organization/updateSubscription`, data);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Subscription", error);
    throw error;
  }
};
export const fetchBilling = async () => {
  try {
    const response = await axios.get(`/organization/fetchBilling`);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Billing", error);
    throw error;
  }
};
export const updateBilling = async (data) => {
  try {
    const response = await axios.put(`/organization/updateBilling`, data);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Subscription", error);
    throw error;
  }
};
export const fetchCompliance = async () => {
  try {
    const response = await axios.get(`/organization/fetchCompliance`);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Compliance", error);
    throw error;
  }
};
export const fetchSecurity = async () => {
  try {
    const response = await axios.get(`/organization/fetchSecurity`);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Security", error);
    throw error;
  }
};
export const updateOrgSecurity = async (data) => {
  try {
    const response = await axios.put(`/organization/updateSecurity`, data);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Security", error);
    throw error;
  }
};

export const fetchAllOrg = async () => {
  try {
    const response = await axios.get(`/organization/full`);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Security", error);
    throw error;
  }
};
export const fetchInvoices = async () => {
  try {
    const response = await axios.get(`/organization/invoices`);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Security", error);
    throw error;
  }
};
// ====================================== Integration ================================
export const fetchIntegration = async ({ search }) => {
  try {
    const response = await axios.get(`/integrations/fetchIntegration`, {
      params: { search },
    });
    return response.data;
  } catch (error) {
    console.error("Error While Fectching Integration", error);
    throw error;
  }
};
export const connectIntegration = async (data) => {
  try {
    const response = await axios.post(`/integrations/connect`, data);
    return response.data;
  } catch (error) {
    console.error("Error While Connect Integration", error);
    throw error;
  }
};
export const disconnectIntegration = async (data) => {
  try {
    const response = await axios.post(`/integrations/disconnect`, data);
    return response.data;
  } catch (error) {
    console.error("Error While Disconnet Integration", error);
    throw error;
  }
};
export const fetchUserIntegration = async () => {
  try {
    const response = await axios.get(`/integrations/user`);
    return response.data;
  } catch (error) {
    console.error("Error While Fectching User Intergation", error);
    throw error;
  }
};

export const createIntegration = async (data) => {
  try {
    const response = await axios.post(`/integrations/createIntegration`, data);
    return response.data;
  } catch (error) {
    console.error("Error While Creating Integration", error);
    throw error;
  }
};
export const saveIntegration = async (id, data) => {
  try {
    const response = await axios.post(`/integrations/configure/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error While configure Integration", error);
    throw error;
  }
};
