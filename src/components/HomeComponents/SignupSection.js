import React from "react";
import SessionSignupItem from "./SignUpSectionListComponents/SessionSignupItem";

const SignupSection = ({ availableSessions }) => (
  <>
    <h3 style={styles.sectionTitle}>הרשמה לאימונים</h3>
    <div style={styles.sessionList}>
      {availableSessions.map((s, i) => (
        <SessionSignupItem key={i} title={s.title} date={s.date} />
      ))}
    </div>
  </>
);

const styles = {
  sectionTitle: {
    fontSize: 20,
    color: "#d76629",
    marginBottom: 12,
    marginTop: 20,
    paddingRight: 10,
  },
  sessionList: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 20,
  },
};

export default SignupSection;
