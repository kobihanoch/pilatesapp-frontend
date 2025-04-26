import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";

const RegisterForm = () => {
  const { register } = useAuthContext();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    birthDate: today,
    gender: "male",
    fullName: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateRegister = () => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullNameRegex = /^[א-תa-zA-Z\s]+$/;

    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.email ||
      !formData.birthDate ||
      !formData.gender ||
      !formData.fullName
    ) {
      alert("חובה למלא את כל השדות");
      return false;
    }

    if (!usernameRegex.test(formData.username)) {
      alert("שם המשתמש חייב להיות באנגלית בלבד");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      alert("אימייל לא חוקי");
      return false;
    }

    if (!fullNameRegex.test(formData.fullName)) {
      alert("שם מלא חייב להכיל רק אותיות ורווחים");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return false;
    }

    if (formData.password.length < 6) {
      alert("הסיסמה חייבת להכיל לפחות 6 תווים");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateRegister()) return;
    try {
      const { username, password, email, birthDate, gender, fullName } =
        formData;
      const newUser = {
        username,
        password,
        email,
        birthDate,
        gender,
        fullName,
      };
      await register(newUser);
      console.log("Registration successful!");
    } catch (error) {
      alert(error.message || "שגיאה בהרשמה");
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
      <input
        style={inputStyle}
        type="password"
        name="confirmPassword"
        placeholder="אימות סיסמה"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <input
        style={inputStyle}
        type="text"
        name="fullName"
        placeholder="שם מלא"
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        style={inputStyle}
        type="email"
        name="email"
        placeholder="אימייל"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        style={inputStyle}
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
      />
      <div style={selectWrapper}>
        <select
          style={selectStyle}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>
        <div style={selectArrow}>▼</div>
      </div>

      <button style={buttonStyle} onClick={handleRegister}>
        הרשם
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

const selectWrapper = {
  position: "relative",
  width: "100%",
  marginBottom: "12px",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  paddingRight: "30px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
  backgroundColor: "#fff",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  textAlign: "right",
};

const selectArrow = {
  position: "absolute",
  top: "50%",
  right: "12px",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  fontSize: "16px",
  color: "#888",
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

export default RegisterForm;
