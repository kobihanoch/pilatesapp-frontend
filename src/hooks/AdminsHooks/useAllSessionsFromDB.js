import { useState, useEffect } from "react";
import { fetchAllSessions } from "../../services/sessionService.js";
import { useErrorContext } from "../../context/errorContext.js";

// ADMINS
const useAllSessionsFromDB = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setError } = useErrorContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetchAllSessions();
        setData(res);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data };
};

export default useAllSessionsFromDB;
