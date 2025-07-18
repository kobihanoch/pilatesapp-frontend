import React, { useState, useEffect } from "react";
import Modal from "../SharedComponents/Modal";
import { useErrorContext } from "../../context/errorContext";
import { validateForm } from "../../utils/sharedUtils";
import useAdminHandler from "../../hooks/AdminsHooks/useAdminHandler";

const CreateSessionModal = ({ isOpen, onClose, setSessions }) => {
  const { setError } = useErrorContext();
  const { handleCreateSession } = useAdminHandler();

  const getCurrentDate = () => new Date().toISOString().slice(0, 10);
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    date: getCurrentDate(),
    time: getCurrentTime(),
    duration: "",
    type: "",
    notes: "",
    status: "מתוכנן",
    location: "סטודיו",
    maxParticipants: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !validateForm({
        date: formData.date,
        time: formData.time,
        type: formData.type,
        duration: formData.duration,
        location: formData.location,
        maxParticipants: formData.maxParticipants,
      })
    ) {
      setError(new Error("נא למלא את כל השדות החובה"));
      return;
    }
    const res = await handleCreateSession(formData);
    if (res.success) {
      setSessions((prev) => (prev ? [res.response, ...prev] : [res.response]));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>יצירת אימון חדש</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>תאריך:</label>
          <div style={styles.dateWrapper}>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              style={styles.dateInput}
            />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label>שעה:</label>
          <div style={styles.timeWrapper}>
            <input
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              style={styles.timeInput}
            />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label>משך בדקות:</label>
          <input
            name="duration"
            type="number"
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>סוג אימון:</label>
          <input
            name="type"
            type="text"
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>הערות:</label>
          <textarea
            name="notes"
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label>סטטוס:</label>
          <div style={styles.selectWrapper}>
            <select name="status" onChange={handleChange} style={styles.select}>
              <option value="מתוכנן">מתוכנן</option>
              <option value="בוטל">בוטל</option>
              <option value="הושלם">הושלם</option>
            </select>
            <span style={styles.selectArrow}>▼</span>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label>מיקום:</label>
          <input
            name="location"
            type="text"
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>מספר משתתפים מקסימלי:</label>
          <input
            name="maxParticipants"
            type="number"
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="button" onClick={handleSubmit} style={styles.submitBtn}>
          צור אימון
        </button>
      </form>
    </Modal>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
  },
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
  timeWrapper: {
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
  timeInput: {
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
  textarea: {
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    resize: "vertical",
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

export default CreateSessionModal;
