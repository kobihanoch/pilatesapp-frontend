import React from "react";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { unregisterFromSelectedSession } from "../../../services/sessionService";
import { formatDate } from "../../../utils/homeUtils";
import { useErrorContext } from "../../../context/errorContext";
import { toast } from "react-toastify";

const WorkoutCard = ({ session, updatedSessions, setUpdatedSessions }) => {
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
    <div
      style={styles.card}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = styles.card.boxShadow)
      }
    >
      <div style={styles.header}>
        <div style={styles.dateBox}>
          <span style={styles.dateText}>{formatDate(session.date)}</span>
          <span style={styles.timeText}>{session.time}</span>
        </div>
        <span style={styles.status(session.status)}>{session.status}</span>
      </div>

      <h3 style={styles.title}>{session.type}</h3>

      <div style={styles.row}>
        <FaMapMarkerAlt size={14} style={styles.icon} />
        <span style={styles.detailText}>{session.location}</span>
      </div>

      <div style={styles.row}>
        <FaUsers size={14} style={styles.icon} />
        <span style={styles.detailText}>
          {session.participants?.length ?? 0}/{session.maxParticipants} משתתפים
        </span>
      </div>

      {session.notes && <p style={styles.notes}>הערה: {session.notes}</p>}

      <button
        style={styles.button}
        onClick={() => handleUnregister(session._id)}
      >
        ביטול רישום
      </button>
    </div>
  );
};

const styles = {
  card: {
    minWidth: 260,
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "box-shadow 0.3s ease",
    marginInlineEnd: "16px",
  },
  cardHover: {
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: "0.9rem",
    color: "#444",
    fontWeight: "500",
  },
  timeText: {
    fontSize: "0.8rem",
    color: "#777",
  },
  status: (status) => ({
    fontSize: "0.75rem",
    padding: "4px 10px",
    borderRadius: "10px",
    fontWeight: "600",
    backgroundColor:
      status === "בוטל"
        ? "#ffe5e5"
        : status === "הושלם"
        ? "#e0f5e0"
        : "#fff6e5",
    color: status === "בוטל" ? "#a00" : status === "הושלם" ? "#0a0" : "#d76629",
  }),
  title: {
    fontSize: "1.1rem",
    color: "#1e1e1e",
    margin: "6px 0",
    fontWeight: "600",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  icon: {
    color: "#d76629",
  },
  detailText: {
    fontSize: "0.9rem",
    color: "#444",
  },
  notes: {
    fontSize: "0.85rem",
    fontStyle: "italic",
    color: "#666",
    marginTop: "6px",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#ffe9e1",
    color: "#d76629",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};

export default WorkoutCard;
