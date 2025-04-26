import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import LoginForm from "../../components/LoginandregisterComponents/LoginForm";
import RegisterForm from "../../components/LoginandregisterComponents/RegisterForm";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const LoginAndRegister = () => {
  const { loading } = useAuthContext();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  if (loading) {
    return <LoadingSpinner text="מתחבר למערכת..."></LoadingSpinner>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{isRegisterMode ? "הרשמה" : "התחברות"}</h1>

        {isRegisterMode ? <RegisterForm /> : <LoginForm />}

        <div style={styles.divider}>או</div>

        <button
          style={{ ...styles.button, backgroundColor: "#4CAF50" }}
          onClick={() => setIsRegisterMode((prev) => !prev)}
        >
          {isRegisterMode ? "כבר רשום? התחבר" : "אין לך חשבון? הרשם"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    direction: "rtl",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: "0",
    backgroundColor: "#f0f2f5",
    overflow: "hidden",
  },
  card: {
    width: "90%",
    maxWidth: "350px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2196F3",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  divider: {
    margin: "15px 0",
    fontSize: "16px",
    color: "#888",
  },
};

export default LoginAndRegister;
