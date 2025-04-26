import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";

const LoginForm = () => {
  const { auth } = useAuthContext();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateLogin = () => {
    if (!formData.username || !formData.password) {
      alert("חובה למלא שם משתמש וסיסמה");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    try {
      await auth.login(formData.username, formData.password);
      console.log("Login successful!");
    } catch (error) {
      alert(error.message || "שגיאה בהתחברות");
    }
  };

  return (
    <>
      <input
        style={inputStyle}
        type="text"
        name="username"
        placeholder="שם משתמש (באנגלית)"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        style={inputStyle}
        type="password"
        name="password"
        placeholder="סיסמה"
        value={formData.password}
        onChange={handleChange}
      />
      <button style={buttonStyle} onClick={handleLogin}>
        התחברות
      </button>
    </>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #d0d7de",
  fontSize: "16px",
  textAlign: "right",
  backgroundColor: "#f9f9f9",
  color: "#333",
  fontFamily: "'M PLUS Rounded 1c', sans-serif",
  appearance: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#66c5cc",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  fontFamily: "'M PLUS Rounded 1c', sans-serif",
  transition: "background-color 0.3s ease",
};

export default LoginForm;
