// EditUserModal.js
import React, { useState, useEffect } from "react";
import Modal from "../SharedComponents/Modal";
import useAdminHandler from "../../hooks/AdminsHooks/useAdminHandler";

const EditUserModal = ({ user, isOpen, onClose, setUsers }) => {
  const [form, setForm] = useState({});
  const { handleUpdateUserData } = useAdminHandler();

  /* -----------------------------------------------------------
   *  Load user data into local state every time the modal opens
   * -----------------------------------------------------------
   */
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

  /* --------------------------------
   *  Two-way binding for each field
   * --------------------------------
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (userId) => {
    const res = await handleUpdateUserData(userId, form);
    if (res.success) {
      // keep table in sync with server
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? res.response.user : u))
      );
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>עריכת משתמש</h2>

      {/* Username ------------------------------------------------ */}
      <div style={styles.formGroup}>
        <label>שם משתמש:</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      {/* Full name ---------------------------------------------- */}
      <div style={styles.formGroup}>
        <label>שם מלא:</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      {/* Email --------------------------------------------------- */}
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

      {/* Birth date --------------------------------------------- */}
      <div style={styles.formGroup}>
        <label>תאריך לידה:</label>
        <input
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      {/* Gender -------------------------------------------------- */}
      <div style={styles.formGroup}>
        <label>מגדר:</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>
      </div>

      {/* Role ---------------------------------------------------- */}
      <div style={styles.formGroup}>
        <label>תפקיד:</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="user">משתמש</option>
          <option value="admin">מנהל</option>
        </select>
      </div>

      {/* ---------------- Submit button ------------------------- */}
      <button style={styles.submitBtn} onClick={() => handleSubmit(user._id)}>
        שמור
      </button>
    </Modal>
  );
};

/* same minimalist inline-styles object you’re already using */
const styles = {
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
  },
  submitBtn: {
    backgroundColor: "#2563eb",
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
