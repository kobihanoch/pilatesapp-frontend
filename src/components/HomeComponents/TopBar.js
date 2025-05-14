import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { FiSettings, FiLogOut } from "react-icons/fi";

const TopBar = ({ fullName, gender, onLogout }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const greeting = gender === "male" ? "ברוך הבא" : "ברוכה הבאה";
  const isAdmin = user?.role === "admin";

  return (
    <div style={styles.container}>
      <div style={styles.profile}>
        <div style={styles.avatar}>{fullName.charAt(0)}</div>
        <div style={styles.text}>
          <div style={styles.greeting}>{greeting}</div>
          <div style={styles.name}>{fullName}</div>
        </div>
      </div>

      <div style={styles.actions}>
        {isAdmin && (
          <button
            style={styles.iconButton}
            onClick={() => navigate("/dashboard")}
          >
            <FiSettings size={20} />
          </button>
        )}
        <button style={styles.iconButton} onClick={onLogout}>
          <FiLogOut size={20} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 32px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: "32px",
    direction: "rtl",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#d76629",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.2,
  },
  greeting: {
    fontSize: "1rem",
    color: "#666",
  },
  name: {
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "#2e2e2e",
  },
  actions: {
    display: "flex",
    gap: "16px",
  },
  iconButton: {
    width: "44px",
    height: "44px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    color: "rgb(71, 71, 71)",
  },
};

export default TopBar;
