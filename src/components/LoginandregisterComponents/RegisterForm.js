import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { FiUser, FiLock, FiMail, FiCalendar, FiSmile } from "react-icons/fi";

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

      <div style={styles.inputWrapper}>
        <FiLock style={styles.icon} />
        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="אימות סיסמה"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div style={styles.inputWrapper}>
        <FiSmile style={styles.icon} />
        <input
          style={styles.input}
          type="text"
          name="fullName"
          placeholder="שם מלא"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div style={styles.inputWrapper}>
        <FiMail style={styles.icon} />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div style={styles.inputWrapper}>
        <FiCalendar style={styles.icon} />
        <input
          style={{
            ...styles.input,
            color: formData.birthDate === today ? "#888" : "#333",
          }}
          type="date"
          name="birthDate"
          value={formData.birthDate === today ? "" : formData.birthDate}
          onChange={handleChange}
          onFocus={(e) => e.target.showPicker && e.target.showPicker()}
        />
        {formData.birthDate === today && (
          <div style={styles.datePlaceholder}>תאריך לידה</div>
        )}
      </div>

      <div style={styles.selectWrapper}>
        <select
          style={styles.select}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="female">נקבה</option>
          <option value="male">זכר</option>
          <option value="other">אחר</option>
        </select>
        <div style={styles.selectArrow}>▼</div>
      </div>

      <button style={styles.button} onClick={handleRegister}>
        הרשמה
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
  datePlaceholder: {
    position: "absolute",
    right: "50px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#888",
    pointerEvents: "none",
    fontSize: "16px",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
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
    height: "30px",
  },
  selectWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: "14px",
  },
  select: {
    width: "100%",
    padding: "12px",
    paddingRight: "36px",
    borderRadius: "8px",
    border: "1px solid #d0d7de",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
    color: "#333",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    textAlign: "right",
  },
  selectArrow: {
    position: "absolute",
    top: "50%",
    right: "14px",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: "18px",
    color: "#7d8ca3",
  },
  button: {
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
  },
};

export default RegisterForm;
