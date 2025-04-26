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
        התחבר
      </button>
    </>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
  textAlign: "right",
  backgroundColor: "#fff",
  appearance: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#2196F3",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default LoginForm;
