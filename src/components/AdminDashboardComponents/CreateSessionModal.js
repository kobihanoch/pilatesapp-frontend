import React, { useState } from "react";
import Modal from "../SharedComponents/Modal";
import { useErrorContext } from "../../context/errorContext";
import { toast } from "react-toastify";
import { validateForm } from "../../utils/sharedUtils";
import useAdminHandler from "../../hooks/AdminsHooks/useAdminHandler";

const CreateSessionModal = ({ isOpen, onClose, setSessions }) => {
  const { setError } = useErrorContext();
  const { handleCreateSession } = useAdminHandler();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
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
      setSessions((prev) => (prev ? [res.response, ...prev] : [res.response])); // Adding new session to state, or if the state is empty create a nre session and make it the only one there
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>יצירת אימון חדש</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>תאריך:</label>
          <input
            name="date"
            type="date"
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>שעה:</label>
          <input
            name="time"
            type="time"
            onChange={handleChange}
            style={styles.input}
          />
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
          <textarea name="notes" onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>סטטוס:</label>
          <select name="status" onChange={handleChange} style={styles.input}>
            <option value="מתוכנן">מתוכנן</option>
            <option value="בוטל">בוטל</option>
            <option value="הושלם">הושלם</option>
          </select>
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
        <button
          type="button"
          onClick={() => handleSubmit()}
          style={styles.submitBtn}
        >
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

export default CreateSessionModal;
