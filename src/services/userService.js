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
      params: { sortOrder: "asc", sortField: "role" },
    });
    return res.data;
  } catch (error) {
    throw translateError(error);
  }
};

// ADMINS - Fetch all sessions with filters
export const fetchFilteredUsers = async (
  page,
  limit,
  search,
  sortField,
  sortOrder
) => {
  try {
    const response = await api.get(`api/users/all`, {
      params: {
        page: page,
        limit: limit,
        search: search,
        sortField: sortField,
        sortOrder: sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};

// For admins
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`api/users/update/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};

// For admins
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`api/users/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};
