import { useState, useEffect } from "react";
import { fetchAllSessionsUntilNextMonth } from "../services/sessionService";

const useSessions = () => {
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchAllSessionsUntilNextMonth();
        setSessions(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { sessions, loading, error };
};

export default useSessions;
