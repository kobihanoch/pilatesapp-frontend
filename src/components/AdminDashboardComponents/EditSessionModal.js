import React, { useState, useEffect } from "react";
import Modal from "../SharedComponents/Modal";
import useAdminHandler from "../../hooks/AdminsHooks/useAdminHandler";
import { toast } from "react-toastify";
import { hasSessionChanged } from "../../utils/adminDashboardUtils";

const EditSessionModal = ({ session, isOpen, onClose, setSessions }) => {
  const [form, setForm] = useState({});
  const { handleUpdateSessionData } = useAdminHandler();

  useEffect(() => {
    if (session) {
      setForm({
        date: session.date?.slice(0, 10) || "",
        time: session.time || "",
        duration: session.duration || "",
        type: session.type || "",
        status: session.status || "מתוכנן",
        location: session.location || "",
        notes: session.notes || "",
        maxParticipants: session.maxParticipants || 0,
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (sessionId) => {
    // If session stays the same just close the modal without API call
    if (!hasSessionChanged(session, form)) {
      onClose();
      toast.info("Nothing has changed");
      return;
    }

    const res = await handleUpdateSessionData(sessionId, form);
    if (res.success) {
      setSessions((prev) =>
        prev.map((s) => (s._id === sessionId ? res.response.session : s))
      );
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>עריכת אימון</h2>

      <div style={styles.formGroup}>
        <label>תאריך:</label>
        <div style={styles.dateWrapper}>
          <input
            name="date"
            type="date"
            value={form.date}
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
            value={form.time}
            onChange={handleChange}
            style={styles.timeInput}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label>משך זמן (דקות):</label>
        <input
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>סוג:</label>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>סטטוס:</label>
        <div style={styles.selectWrapper}>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="מתוכנן">מתוכנן</option>
            <option value="הושלם">הושלם</option>
            <option value="בוטל">בוטל</option>
          </select>
          <span style={styles.selectArrow}>▼</span>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label>מיקום:</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>הערות:</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          style={styles.textarea}
        />
      </div>

      <div style={styles.formGroup}>
        <label>מ"ס משתתפים מקסימלי:</label>
        <input
          name="maxParticipants"
          type="number"
          value={form.maxParticipants}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <button
        style={styles.submitBtn}
        onClick={() => handleSubmit(session._id)}
      >
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

export default EditSessionModal;
