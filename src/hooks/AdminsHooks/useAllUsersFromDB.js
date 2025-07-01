import { useState, useEffect } from "react";
import { fetchAllUsers } from "../../services/userService";
import { useErrorContext } from "../../context/errorContext";

const useAllUsersFromDB = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setError } = useErrorContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetchAllUsers();
        setUsers(res);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { users, loading };
};

export default useAllUsersFromDB;
