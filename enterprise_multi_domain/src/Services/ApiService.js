import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const Login = async ({ username, password }) => {
  try {
    const response = await axios.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("API Login Error", error);
    throw error;
  }
};

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

export const addTask = async (payload) => {
  try {
    const response = await axios.post("/tasks/createTask", payload);
    return response.data;
  } catch (error) {
    console.error("Error While Adding Team", error);
    throw error;
  }
};
