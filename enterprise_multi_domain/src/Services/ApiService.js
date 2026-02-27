import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.credentials = true;

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
