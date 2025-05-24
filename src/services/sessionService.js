import api from "../api/api";

// Unregister a session
export const unregisterFromSelectedSession = async (sessionId) => {
  try {
    const response = await api.post(`/api/sessions/unregister/${sessionId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};

// Register a session
export const registerToSelectedSession = async (sessionId) => {
  try {
    const response = await api.post(`/api/sessions/register/${sessionId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.status == 400) {
      throw new Error(
        "לא ניתן להירשם: אתה כבר רשום לאימון זה או שהאימון הסתיים/בוטל."
      );
    }
    throw error.response.data.message;
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
    throw error.response.data.message;
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
    throw error.response.data.message;
  }
};
