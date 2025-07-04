import React from "react";
import Modal from "../../SharedComponents/Modal";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaRegCalendarAlt,
  FaStickyNote,
  FaTimes,
  FaRegClock,
  FaRegCommentDots,
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
          <div key={s._id} style={styles.card}>
            <h4 style={styles.title}>{s.type}</h4>
            <div style={styles.day}></div>
            <div
              style={{
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgb(105, 105, 105)",
                marginTop: "-10px",
              }}
            >
              <span>
                {getDayName(s.date)} | {formatDate(s.date)} | {s.time} (
                {s.duration} דקות)
              </span>
            </div>
            <div style={styles.detailContainer}>
              <FaMapMarkerAlt style={styles.icon}></FaMapMarkerAlt>
              {s.location}
            </div>
            <div style={styles.detailContainer}>
              <FaRegCommentDots style={styles.icon} />
              {s.notes || "ללא"}
            </div>
            <div style={styles.detailContainer}>
              <FaUsers style={styles.icon} />
              {s.participants?.length ?? 0}/{s.maxParticipants} משתתפים
            </div>

            <button
              type="button"
              title="בטל רישום"
              style={styles.unregBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0f0f0";
                e.currentTarget.style.border = "1px solid #ccc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f9f9f9";
                e.currentTarget.style.border = "1px solid transparent";
              }}
              onClick={() => handleUnregister(s._id)}
            >
              ביטול רישום
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
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "rgb(105, 105, 105)",
    alignSelf: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.3rem",
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
    width: "100%",
    background: "#f9f9f9",
    color: "#444",
    border: "1px solid transparent",
    borderRadius: "8px",
    padding: "6px 16px",
    fontSize: "0.85rem",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    boxShadow: "none",
  },
  icon: {
    marginLeft: "5px",
    fontSize: "0.8rem",
  },
  detailContainer: {
    color: "black",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
  },
};
