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
    const response = await api.get(`api/sessions/all`, {
      params: { sortOrder: "desc" },
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw translateError(error);
  }
};

// ADMINS - Fetch all sessions with filters
export const fetchFilteredSessions = async (
  page,
  limit,
  search,
  sortField,
  sortOrder
) => {
  try {
    const response = await api.get(`api/sessions/all`, {
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

// ADMINS - Register a user to a session
export const registerUserToSession = async (sessionId, userId) => {
  try {
    const response = await api.post(
      `api/sessions/register/${sessionId}/${userId}`
    );
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};

// ADMINS - Unregister a user from a session
export const unregisterUserFromSession = async (sessionId, userId) => {
  try {
    const response = api.post(`api/sessions/unregister/${sessionId}/${userId}`);
    return response.data;
  } catch (error) {
    throw translateError(error);
  }
};
