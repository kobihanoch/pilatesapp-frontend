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

  console.log(
    "Filtered: ",
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
        borderColor: "black",
        alignSelf: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        paddingBottom: "0px",
      }}
    >
      <h3 style={styles.sectionTitle}>אימונים זמינים להרשמה</h3>
      <SelectDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></SelectDate>
      <div
        style={{
          overflowX: "scroll",
          display: "flex",
          width: "90%",
          alignSelf: "center",
          flex: 9,
          flexDirection: "row",
          marginTop: "30px",
          gap: 20,
        }}
      >
        {sessions?.map((ses) => (
          <AvailableSessionItem
            key={ses._id}
            session={ses}
          ></AvailableSessionItem>
        ))}
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
    paddingRight: 10,
    flex: 1,
    marginTop: "40px",
  },
};

export default SignupSection;
