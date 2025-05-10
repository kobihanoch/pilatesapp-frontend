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
      throw "אתם רשומים כבר לאימון זה.";
    }
    throw error.response.data.message;
  }
};

// Gets all sessions until next month
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
