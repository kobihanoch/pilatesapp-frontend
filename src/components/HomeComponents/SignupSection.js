import React, { useState, useEffect } from "react";
import AvailableSessionItem from "./SignUpSectionListComponents/AvailableSessionItem";
import { addComoponentToDate } from "../../utils/homeUtils";
import SelectDate from "./SignUpSectionListComponents/SelectDate";
import { fetchAllSessionsForYear } from "../../services/sessionService";
import { useErrorContext } from "../../context/errorContext";

const SignupSection = ({ availableSessions }) => {
  const { setError } = useErrorContext();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [sessions, setSessions] = useState(() =>
    availableSessions.filter((ses) => ses.date.split("T")[0] === selectedDate)
  );

  useEffect(() => {
    const fetchSessions = async () => {
      const selected = new Date(selectedDate);
      const currentYear = new Date().getFullYear();
      const isDateInCurrentYear = selected.getFullYear() === currentYear;

      if (!isDateInCurrentYear) {
        try {
          const sessionsF = await fetchAllSessionsForYear(selectedDate);
          setSessions(() =>
            sessionsF.filter((ses) => ses.date.split("T")[0] === selectedDate)
          );
        } catch (e) {
          setError(e);
        }
      } else {
        setSessions(() =>
          availableSessions.filter(
            (ses) => ses.date.split("T")[0] === selectedDate
          )
        );
      }
    };

    fetchSessions();
  }, [selectedDate]);

  return (
    <div style={styles.container}>
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h3 style={styles.sectionTitle}>אימונים זמינים להרשמה</h3>
        <p style={styles.subTitle}>בחרו תאריך רצוי לאימון</p>
      </div>

      <div
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <SelectDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div style={styles.sessionsList}>
        {sessions && sessions.length > 0 ? (
          sessions.map((ses) => (
            <AvailableSessionItem key={ses._id} session={ses} />
          ))
        ) : (
          <p>לא נמצאו אימונים לתאריך זה</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: "auto auto auto 1fr",
    width: "90%",
    margin: "0 auto",
    gap: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    borderRadius: 12,
    marginTop: 40,
  },
  sectionTitle: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "1.15rem",
    marginBottom: 6,
  },
  subTitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    marginBottom: 10,
    textAlign: "center",
  },
  sessionsList: {
    overflowX: "scroll",
    borderRadius: "10px",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: "20px",
  },
};

export default SignupSection;
