import React from "react";

const SessionSignupItem = ({ title, date }) => (
  <div style={styles.sessionItem}>
    <p style={styles.sessionText}>
      {title} - {date}
    </p>
    <button style={styles.signupButton}>להירשם</button>
  </div>
);

const styles = {
  sessionItem: {
    backgroundColor: "#fff",
    padding: "14px 16px",
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionText: {
    fontSize: 16,
    color: "#333",
  },
  signupButton: {
    backgroundColor: "#f4b183",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 15,
    cursor: "pointer",
  },
};

export default SessionSignupItem;
