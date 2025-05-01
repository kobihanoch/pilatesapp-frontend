import React from "react";

const TopBar = ({ fullName, gender, onLogout }) => (
  <div style={styles.topBar}>
    <h2 style={styles.userName}>
      {gender === "male" ? "ברוך הבא" : "ברוכה הבאה"}, {fullName}
    </h2>
    <button style={styles.logoutButton} onClick={onLogout}>
      התנתקות
    </button>
  </div>
);

const styles = {
  topBar: {
    backgroundColor: "#f4b183",
    padding: "16px 20px",
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
  },
  userName: {
    fontSize: 20,
    margin: 0,
  },
  logoutButton: {
    backgroundColor: "#d76629",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: 16,
    cursor: "pointer",
  },
};

export default TopBar;
