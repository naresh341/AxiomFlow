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
