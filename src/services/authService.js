import api from "../api/api";
import { translateError } from "../utils/translateError";

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/api/auth/login", { username, password });
    return response;
  } catch (error) {
    throw translateError(error);
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/api/auth/logout", {});
  } catch (error) {
    console.error("Error logging out:", error);
    throw translateError(error);
  }
};

export const registerUser = async (user) => {
  try {
    const response = await api.post("api/users/create", user, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};
