import { useState, useEffect } from "react";
import { useErrorContext } from "../../context/errorContext";
import {
  registerUserToSession,
  unregisterUserFromSession,
  updateSession,
} from "../../services/sessionService";
import { toast } from "react-toastify";
import { updateUser } from "../../services/userService";

const useAdminHandler = () => {
  const [loading, setLoading] = useState(false);
  const { setError } = useErrorContext();

  const handleUnregisterUserFromSession = async (sessionId, userId) => {
    try {
      setLoading(true);
      const res = await unregisterUserFromSession(sessionId, userId);
      toast.success("משתמש הוסר מההרשמה בהצלחה!");
      return res;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSessionData = async (sessionId, sessionData) => {
    try {
      setLoading(true);
      const res = await updateSession(sessionId, sessionData);
      toast.success("ההרשמה עודכנה בהצלחה!");
      return { success: true, response: res };
    } catch (error) {
      setError(error);
      return { success: false, response: null };
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserToSession = async (sessionId, username) => {
    try {
      setLoading(true);
      const res = await registerUserToSession(sessionId, username);
      toast.success("ההרשמה עודכנה בהצלחה!");
      return { success: true, response: res };
    } catch (error) {
      setError(error);
      return { success: false, response: null };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserData = async (userId, userData) => {
    try {
      setLoading(true);
      const res = await updateUser(userId, userData);
      toast.success("שינוי פרטי המשתמש בוצע בהצלחה!");
      return { success: true, response: res };
    } catch (error) {
      setError(error);
      return { success: false, response: null };
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUnregisterUserFromSession,
    handleUpdateSessionData,
    handleAddUserToSession,
    handleUpdateUserData,
    loading,
  };
};

export default useAdminHandler;
