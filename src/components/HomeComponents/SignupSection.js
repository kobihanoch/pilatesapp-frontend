import React, { useState, useEffect } from "react";
import AvailableSessionItem from "./SignUpSectionListComponents/AvailableSessionItem";
import { addComoponentToDate } from "../../utils/homeUtils";
import SelectDate from "./SignUpSectionListComponents/SelectDate";
import { fetchAllSessionsForYear } from "../../services/sessionService";

const SignupSection = ({ availableSessions }) => {
  // Date modification
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [sessions, setSessions] = useState(() => {
    return availableSessions.filter(
      (ses) => ses.date.split("T")[0] === selectedDate
    );
  });

  useEffect(() => {
    const fetchSessions = async () => {
      const selected = new Date(selectedDate);
      const currentYear = new Date().getFullYear();
      const isDateInCurrentYear = selected.getFullYear() === currentYear;
      if (!isDateInCurrentYear) {
        try {
          const sessionsF = await fetchAllSessionsForYear(selectedDate);
          setSessions(() => {
            return sessionsF.filter(
              (ses) => ses.date.split("T")[0] === selectedDate
            );
          });
        } catch (e) {
          alert(e);
        }
      } else {
        setSessions(() => {
          return availableSessions.filter(
            (ses) => ses.date.split("T")[0] === selectedDate
          );
        });
      }
    };
    fetchSessions();
  }, [selectedDate]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto 1fr",
        height: "80vh",
        width: "90%",
        margin: "0 auto",
        gap: "20px",
        paddingBottom: "20px",
      }}
    >
      <h3 style={styles.sectionTitle}>אימונים זמינים להרשמה</h3>

      <SelectDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div
        style={{
          overflowY: "visible",
          borderRadius: "10px",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {sessions && sessions.length > 0 ? (
          sessions?.map((ses) => (
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
  sectionTitle: {
    fontSize: 25,
    color: "black",
    marginBottom: 12,
    marginTop: 20,
    flex: 1,
    marginTop: "40px",
  },
};

export default SignupSection;
