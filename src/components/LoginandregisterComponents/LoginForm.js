import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { FiUser, FiLock } from "react-icons/fi";
import { useErrorContext } from "../../context/errorContext";
import { validateLogin } from "../../utils/loginUtils";

const LoginForm = () => {
  const { auth } = useAuthContext();
  const { setError } = useErrorContext();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      validateLogin(formData.username, formData.password); // Throws expection if form is not fully filled
      await auth.login(formData.username, formData.password);
      console.log("Login successful!");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div style={styles.inputWrapper}>
        <FiUser style={styles.icon} />
        <input
          style={styles.input}
          type="text"
          name="username"
          placeholder="שם משתמש (באנגלית)"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div style={styles.inputWrapper}>
        <FiLock style={styles.icon} />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="סיסמה"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button style={styles.button} onClick={handleLogin}>
        התחברות
      </button>
    </>
  );
};

const styles = {
  inputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    border: "1px solid #d0d7de",
    borderRadius: "8px",
    direction: "rtl",
  },
  icon: {
    padding: "10px",
    fontSize: "20px",
    color: "#7d8ca3",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "transparent",
    textAlign: "right",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
    overflow: "hidden",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "rgb(215, 191, 166)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
    transition: "background-color 0.3s ease",
  },
};

export default LoginForm;
