import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { FiUser, FiLock, FiMail, FiCalendar, FiSmile } from "react-icons/fi";
import { useErrorContext } from "../../context/errorContext";
import { toast } from "react-toastify";
import { validateRegister } from "../../utils/registerUtils";
import Modal from "../../components/SharedComponents/Modal.js";
import { accessibilityText, privacyText, termsText } from "./UsefulTexts.js";

const RegisterForm = () => {
  const { register } = useAuthContext();
  const { setError } = useErrorContext();

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

  // NEW: consent and modals state
  const [consentChecked, setConsentChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    try {
      // English comments only inside code:
      // Block submission if user did not consent to terms & privacy.
      if (!consentChecked) {
        toast.error("יש לאשר את תנאי השימוש ומדיניות הפרטיות");
        return;
      }

      const { username, password, email, birthDate, gender, fullName } =
        formData;

      validateRegister(
        username,
        password,
        formData.confirmPassword,
        email,
        birthDate,
        gender,
        fullName
      ); // Throws error if not fully filled

      const newUser = {
        username,
        password,
        email,
        birthDate,
        gender,
        fullName,
      };

      await register(newUser);
      toast.success("הרשמה בוצעה בהצלחה");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {/* -- existing fields -- */}
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
          aria-label="מין"
        >
          <option value="female">נקבה</option>
          <option value="male">זכר</option>
          <option value="other">אחר</option>
        </select>
        <div style={styles.selectArrow}>▼</div>
      </div>

      {/* NEW: consent row (minimal visual footprint, matches current style) */}
      <div style={consentStyles.row}>
        <input
          id="consent"
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          style={consentStyles.checkbox}
          aria-required="true"
        />
        <label htmlFor="consent" style={consentStyles.label}>
          אני מאשר/ת את{" "}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            style={consentStyles.linkBtn}
            aria-haspopup="dialog"
            aria-controls="terms-modal"
          >
            תנאי השימוש
          </button>{" "}
          ו־{" "}
          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            style={consentStyles.linkBtn}
            aria-haspopup="dialog"
            aria-controls="privacy-modal"
          >
            מדיניות הפרטיות (כולל שימוש בעוגיות חיוניות בלבד)
          </button>
        </label>
      </div>

      {/* Optional: tiny note about cookies (essential only) */}
      <div style={consentStyles.note}>
        אנו משתמשים בעוגיות חיוניות בלבד לצורכי התחברות ותפקוד האתר.
      </div>

      <button
        style={{
          ...styles.button,
          opacity: consentChecked ? 1 : 0.6, // visual hint only
          cursor: consentChecked ? "pointer" : "not-allowed",
        }}
        onClick={handleRegister}
        disabled={!consentChecked} // block click until consent
        aria-disabled={!consentChecked}
      >
        הרשמה
      </button>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          type="button"
          onClick={() => setShowAccessibility(true)}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
          }}
        >
          הצהרת נגישות
        </button>
      </div>

      {/* TERMS MODAL */}
      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)}>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            textAlign: "right",
            fontSize: 20,
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
          }}
        >
          {termsText}
        </pre>
      </Modal>

      {/* PRIVACY MODAL */}
      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            textAlign: "right",
            fontSize: 20,
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
          }}
        >
          {privacyText}
        </pre>
      </Modal>

      <Modal
        isOpen={showAccessibility}
        onClose={() => setShowAccessibility(false)}
      >
        <pre
          style={{
            whiteSpace: "pre-wrap",
            textAlign: "right",
            fontSize: 20,
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
          }}
        >
          {accessibilityText}
        </pre>
      </Modal>
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
    overflow: "hidden",
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
    backgroundColor: "rgb(215, 191, 166)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
    transition: "background-color 0.3s ease",
  },
};

// New minimal styles only for consent area (does not change existing design)
const consentStyles = {
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    direction: "rtl",
    marginTop: "6px",
    marginBottom: "6px",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
    fontSize: "14px",
    color: "#374151",
  },
  checkbox: {
    marginTop: "3px",
    flexShrink: 0,
  },
  label: {
    lineHeight: 1.5,
  },
  linkBtn: {
    background: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    color: "#2563eb",
    textDecoration: "underline",
    cursor: "pointer",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
    fontSize: "14px",
  },
  note: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "2px",
    direction: "rtl",
  },
};

export default RegisterForm;
