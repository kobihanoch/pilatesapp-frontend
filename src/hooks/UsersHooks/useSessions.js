import { useState, useEffect } from "react";
import { fetchAllSessionsForYear } from "../../services/sessionService";

const useSessions = (selectedDate) => {
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        setLoading(true);
        try {
          const data = await fetchAllSessionsForYear(selectedDate);
          setSessions(data);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedDate]);

  return { sessions, loading, error };
};

export default useSessions;
