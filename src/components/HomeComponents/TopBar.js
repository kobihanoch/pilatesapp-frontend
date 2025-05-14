import React from "react";

const TopBar = ({ fullName, gender, onLogout }) => {
  const greeting = gender === "male" ? "ברוך הבא" : "ברוכה הבאה";

  return (
    <div style={styles.topBar}>
      <h2 style={styles.userName}>
        {greeting}, <span style={styles.name}>{fullName}</span>
      </h2>
      <button style={styles.logoutButton} onClick={onLogout}>
        התנתקות
      </button>
    </div>
  );
};

const styles = {
  topBar: {
    backgroundColor: "#FDFCFB",
    padding: "16px 24px",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
    direction: "rtl",
  },
  userName: {
    fontSize: "1.3rem",
    margin: 0,
    fontWeight: 500,
    color: "#2E2E2E",
  },
  name: {
    color: "#d76629",
    fontWeight: 600,
  },
  logoutButton: {
    backgroundColor: "#d76629",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.25s ease",
  },
};

export default TopBar;
