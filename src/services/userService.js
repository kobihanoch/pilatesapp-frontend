import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const fetchAuthenticatedUser = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/users/get", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
