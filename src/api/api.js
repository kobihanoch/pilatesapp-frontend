import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Interceptor for unauthorized requests
axios.interceptors.request.use(
  // Make sure to include credentials in the request
  (config) => {
    withCredentials: true;
    return config;
  },
  // Redirect if unauthorized
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    Promise.reject(error);
  }
);

export default api;
