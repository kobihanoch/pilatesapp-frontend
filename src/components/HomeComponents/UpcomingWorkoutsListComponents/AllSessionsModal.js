import React from "react";
import Modal from "../../SharedComponents/Modal";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaRegCalendarAlt,
  FaStickyNote,
  FaTimes,
} from "react-icons/fa";
import { formatDate, getDayName } from "../../../utils/homeUtils";
import { useErrorContext } from "../../../context/errorContext.js";
import { toast } from "react-toastify";
import { unregisterFromSelectedSession } from "../../../services/sessionService.js";

const AllSessionsModal = ({
  isOpen,
  onClose,
  sessions,
  setUpdatedSessions,
  updatedSessions,
}) => {
  // Error context
  const { setError } = useErrorContext();

  const handleUnregister = async (sessionId) => {
    const isConfirmed = window.confirm("האם אתה בטוח שברצונך לבטל את הרישום?");
    if (!isConfirmed) return;

    try {
      await unregisterFromSelectedSession(sessionId);
      setUpdatedSessions(updatedSessions.filter((s) => s._id !== sessionId));
      toast.info("ביטול הרישום בוצע בהצלחה");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={styles.wrapper}>
        {sessions.map((s) => (
          <div key={s._id} className="session-card" style={styles.card}>
            <div style={styles.day}>{getDayName(s.date)}</div>
            <h4 style={styles.title}>{s.type}</h4>
            <div style={styles.row}>
              <FaRegCalendarAlt />
              <span>
                {formatDate(s.date)} | {s.time} ({s.duration} דקות)
              </span>
            </div>
            <div>
              <div style={styles.label}>מיקום:</div>
              <div style={styles.row}>
                <FaMapMarkerAlt />
                <span>{s.location}</span>
              </div>
            </div>
            <div>
              <div style={styles.label}>משתתפים:</div>
              <div style={styles.row}>
                <FaUsers />
                <span>
                  {s.participants?.length ?? 0} מתוך {s.maxParticipants}
                </span>
              </div>
            </div>
            <div>
              <div style={styles.label}>הערות:</div>
              <div style={styles.row}>
                <FaStickyNote />
                <span>{s.notes?.trim() ? s.notes : "ללא"}</span>
              </div>
            </div>

            <button
              type="button"
              title="בטל רישום"
              style={styles.unregBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e34e4e";
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff6b6b";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => handleUnregister(s._id)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AllSessionsModal;

// -------------------- styles --------------------
const styles = {
  wrapper: {
    direction: "rtl",
    maxHeight: "70vh",
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: "14px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.2s ease-in-out",
  },
  day: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#5c5c5c",
    alignSelf: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 700,
    textAlign: "center",
    color: "#2d2d2d",
  },
  label: {
    fontWeight: 600,
    fontSize: "0.85rem",
    marginBottom: "3px",
    color: "#333",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.82rem",
    color: "#4e4e4e",
    transition: "color 0.2s ease-in-out",
  },
  unregBtn: {
    alignSelf: "center",
    width: "48px",
    aspectRatio: "1",
    borderRadius: "50%",
    border: "none",
    background: "#ff6b6b",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.1rem",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
  },
};
