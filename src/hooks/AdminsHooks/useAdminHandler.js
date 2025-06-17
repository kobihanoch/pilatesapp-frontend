import { useState, useEffect } from "react";
import { useErrorContext } from "../../context/errorContext";
import {
  registerUserToSession,
  unregisterFromSelectedSession,
  unregisterUserFromSession,
  updateSession,
} from "../../services/sessionService";
import { toast } from "react-toastify";

const useAdminHandler = () => {
  const [loading, setLoading] = useState(false);
  const { setError } = useErrorContext();

  const handleRegisterUserToSession = async (sessionId, userId) => {
    try {
      setLoading(true);
      await registerUserToSession(sessionId, userId);
      toast.success("משתמש נרשם בהצלחה!");
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUnregisterUserFromSession = async (sessionId, userId) => {
    try {
      setLoading(true);
      await unregisterUserFromSession(sessionId, userId);
      toast.success("משתמש הוסר מההרשמה בהצלחה!");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSessionData = async (sessionId, sessionData) => {
    try {
      setLoading(true);
      await updateSession(sessionId, sessionData);
      toast.success("ההרשמה עודכנה בהצלחה!");
      return true;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegisterUserToSession,
    handleUnregisterUserFromSession,
    handleUpdateSessionData,
    loading,
  };
};

export default useAdminHandler;
