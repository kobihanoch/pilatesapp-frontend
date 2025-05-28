import { useState, useEffect } from "react";
import { fetchAllSessions } from "../../services/sessionService.js";
import { useErrorContext } from "../../context/errorContext.js";

// ADMINS
const useAllSessionsFromDB = () => {
  const [data, setData] = useState(null);
  const { setError } = useErrorContext();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAllSessions();
        setData(res);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  return { data };
};

export default useAllSessionsFromDB;
