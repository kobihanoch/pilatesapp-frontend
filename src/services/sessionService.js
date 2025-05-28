import api from "../api/api";
import { translateError } from "../utils/translateError";

// Unregister a session
export const unregisterFromSelectedSession = async (sessionId) => {
  try {
    const response = await api.post(`/api/sessions/unregister/${sessionId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw translateError(error);
  }
};

// Register a session
export const registerToSelectedSession = async (sessionId) => {
  try {
    const response = await api.post(`/api/sessions/register/${sessionId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw translateError(error);
  }
};

// Gets all sessions for year period of time
export const fetchAllSessionsForYear = async (selectedDate) => {
  try {
    console.log("Front calling API");
    const response = await api.get(`api/sessions/soon`, {
      params: { date: selectedDate },
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw translateError(error);
  }
};

// ADMINS - Fetch all sessions
export const fetchAllSessions = async () => {
  try {
    const response = await api.get(`api/sessions/all`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw translateError(error);
  }
};
