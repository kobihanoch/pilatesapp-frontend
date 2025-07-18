import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { FiSettings, FiLogOut, FiHome } from "react-icons/fi";

const TopBar = () => {
  const navigate = useNavigate();
  const { user, auth } = useAuthContext();
  const { gender, fullName } = user || {};
  const isAdmin = user?.role === "admin";
  const greeting = gender === "male" ? "ברוך הבא" : "ברוכה הבאה";
  const isAdminPage = useLocation().pathname.includes("/dashboard");

  const onLogout = () => {
    auth.logout();
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <div style={styles.avatarShadow}>
          <div style={styles.avatar}>{fullName?.charAt(0)}</div>
        </div>
        <div style={styles.userInfo}>
          <div style={styles.greeting}>{greeting}</div>
          <div style={styles.fullName}>{fullName}</div>
        </div>
      </div>

      <div style={styles.rightSide}>
        {isAdmin &&
          (isAdminPage ? (
            <button style={styles.iconBtn} onClick={() => navigate("/home")}>
              <FiHome size={20} />
            </button>
          ) : (
            <button
              style={styles.iconBtn}
              onClick={() => navigate("/dashboard")}
            >
              <FiSettings size={20} />
            </button>
          ))}
        <button style={styles.iconBtn} onClick={onLogout}>
          <FiLogOut size={20} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(135deg,rgb(247, 247, 247),rgb(246, 251, 255))",
    padding: "20px 32px",
    borderRadius: "20px",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    direction: "rtl",
    marginBottom: "32px",
  },
  leftSide: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  avatarShadow: {
    boxShadow: "0 0px 10px rgba(0,0,0,0.04)",
    borderRadius: "50%",
  },
  avatar: {
    width: "48px",
    height: "48px",
    backgroundColor: "white",
    borderRadius: "50%",
    color: "rgb(0, 0, 0)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.2,
  },
  greeting: {
    fontSize: "0.95rem",
    color: "#7a7a7a",
  },
  fullName: {
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "#333",
  },
  rightSide: {
    display: "flex",
    gap: "14px",
  },
  iconBtn: {
    width: "44px",
    height: "44px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#f0f3f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
    color: "#444",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  },
};

export default TopBar;
