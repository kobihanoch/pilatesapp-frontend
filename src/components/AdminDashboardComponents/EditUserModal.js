import React, { useState, useEffect } from "react";
import Modal from "../SharedComponents/Modal";
import useAdminHandler from "../../hooks/AdminsHooks/useAdminHandler";

const EditUserModal = ({ user, isOpen, onClose, setUsers }) => {
  const [form, setForm] = useState({});
  const { handleUpdateUserData } = useAdminHandler();

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        fullName: user.fullName || "",
        email: user.email || "",
        birthDate: user.birthDate?.slice(0, 10) || "",
        gender: user.gender || "male",
        role: user.role || "user",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (userId) => {
    const res = await handleUpdateUserData(userId, form);
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? res.response.user : u))
      );
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>עריכת משתמש</h2>

      <div style={styles.formGroup}>
        <label>שם משתמש:</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>שם מלא:</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>אימייל:</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>תאריך לידה:</label>
        <div style={styles.dateWrapper}>
          <input
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={handleChange}
            style={styles.dateInput}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label>מגדר:</label>
        <div style={styles.selectWrapper}>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="male">זכר</option>
            <option value="female">נקבה</option>
            <option value="other">אחר</option>
          </select>
          <span style={styles.selectArrow}>▼</span>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label>תפקיד:</label>
        <div style={styles.selectWrapper}>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="user">משתמש</option>
            <option value="admin">מנהל</option>
          </select>
          <span style={styles.selectArrow}>▼</span>
        </div>
      </div>

      <button style={styles.submitBtn} onClick={() => handleSubmit(user._id)}>
        שמור
      </button>
    </Modal>
  );
};

const styles = {
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  dateWrapper: {
    position: "relative",
    display: "flex",
  },
  dateInput: {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
    direction: "rtl",
  },
  input: {
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
  },
  selectWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  select: {
    padding: "0.65rem",
    minHeight: "2.5rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    backgroundColor: "#fff",
    color: "#000",
    WebkitAppearance: "none",
    MozAppearance: "none",
    width: "100%",
  },
  selectArrow: {
    position: "absolute",
    left: "12px",
    pointerEvents: "none",
    fontSize: "0.8rem",
    color: "#555",
  },
  submitBtn: {
    backgroundColor: "rgb(215, 191, 166)",
    color: "#fff",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background 0.2s ease",
  },
};

export default EditUserModal;
