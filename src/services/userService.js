import axios from "axios";
import { API_BASE_URL } from "../api/apiConfig";
import api from "../api/api";
import { translateError } from "../utils/translateError";

export const fetchAuthenticatedUser = async () => {
  try {
    const response = await api.get("/api/users/get");
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};

export const checkIfUserIsAuthenticated = async () => {
  try {
    const response = await api.get("/api/auth/checkauth");
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};

export const fetchAuthenticatedUserSessions = async () => {
  try {
    const response = await api.get("/api/sessions/my");
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await api.get("/api/users/all", {
      params: { sortOrder: "desc" },
    });
    return res.data;
  } catch (error) {
    throw translateError(error);
  }
};
