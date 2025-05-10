import React, { useState, useEffect } from "react";
import AvailableSessionItem from "./SignUpSectionListComponents/AvailableSessionItem";

const SignupSection = ({ availableSessions }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  return (
    <div
      style={{
        borderColor: "black",
        alignSelf: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        paddingBottom: "100px",
      }}
    >
      <h3 style={styles.sectionTitle}>אימונים זמינים להרשמה</h3>
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignSelf: "center",
        }}
      >
        <p>תאריך רצוי</p>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        ></input>
      </span>
      <div
        style={{
          overflowY: "scroll",
          display: "flex",
          width: "90%",
          alignSelf: "center",
          flex: 9,
          flexDirection: "column",
          marginTop: "30px",
        }}
      >
        {availableSessions?.map((session) => (
          <AvailableSessionItem
            key={session._id}
            session={session}
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
