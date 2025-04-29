import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { globalSetUser } from "../context/authContext";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Interceptor for requests
api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If refreshing 2nd time - don't try again - set user to null
    if (originalRequest.url.includes("/api/auth/refresh")) {
      if (globalSetUser) {
        globalSetUser(null); // Set user to null if refresh fails
      }
      return Promise.reject(error); // Throw error
    }

    // If first time - try to refresh if not already retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        if (globalSetUser) {
          globalSetUser(null);
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
