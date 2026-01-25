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
