import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const loginUser = async (username, password) => {
  try {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    const response = await axios.post(API_BASE_URL + "/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const logoutUser = async (token) => {
  try {
    await axios.post(
      API_BASE_URL + "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(API_BASE_URL + "/users/create", user);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
