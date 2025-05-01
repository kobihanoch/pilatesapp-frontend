import axios from "axios";
import { API_BASE_URL } from "../api/apiConfig";
import api from "../api/api";

export const fetchAuthenticatedUser = async () => {
  try {
    const response = await api.get("/api/users/get");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const checkIfUserIsAuthenticated = async () => {
  try {
    const response = await api.get("/api/auth/checkauth");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const fetchAuthenticatedUserSessions = async () => {
  try {
    const response = await api.get("/api/sessions/my");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
