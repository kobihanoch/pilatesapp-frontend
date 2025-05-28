import api from "../api/api";

export const loginUser = async (username, password) => {
  try {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    const response = await api.post("/api/auth/login", { username, password });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/api/auth/logout", {});
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await api.post("api/users/create", user, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
