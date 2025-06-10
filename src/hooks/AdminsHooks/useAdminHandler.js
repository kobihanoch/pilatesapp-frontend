import { useState, useEffect } from "react";
import { useErrorContext } from "../../context/errorContext";
import {
  registerUserToSession,
  unregisterFromSelectedSession,
  unregisterUserFromSession,
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

  return {
    handleRegisterUserToSession,
    handleUnregisterUserFromSession,
    loading,
  };
};

export default useAdminHandler;
