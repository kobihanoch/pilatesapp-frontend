import { useState, useEffect } from "react";
import { fetchAllSessions } from "../../services/sessionService.js";

// ADMINS
const useAllSessionsFromDB = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAllSessions();
        setData(res);
      } catch (e) {
        throw e;
      }
    })();
  }, []);

  return { data };
};

export default useAllSessionsFromDB;
