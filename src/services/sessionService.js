import api from "../api/api";

export const unregisterFromSelectedSession = async (sessionId) => {
  try {
    console.log(sessionId);
    const response = await api.post(`/api/sessions/unregister/${sessionId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};
