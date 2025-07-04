import React from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaTimes,
  FaRegCommentDots,
  FaRegClock,
} from "react-icons/fa";
import { unregisterFromSelectedSession } from "../../../services/sessionService";
import { formatDate, getDayName } from "../../../utils/homeUtils";
import { useErrorContext } from "../../../context/errorContext";
import { toast } from "react-toastify";

const getDayLabelStyle = () => ({
  display: "inline-block",
  padding: "4px 14px",
  borderRadius: "999px",
  fontSize: "0.9rem",
  fontWeight: "1000",
  backgroundColor: "#4FC3F7",
  color: "white",
  textAlign: "center",
  letterSpacing: "0.5px",
  boxShadow: "inset 0 0 3px rgba(0,0,0,0.05)",
});

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
    <div style={styles.card}>
      {/* Day label */}
      <div style={getDayLabelStyle()}>
        {(() => {
          const date = new Date(session.date);
          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);

          const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();

          const isTomorrow =
            date.getFullYear() === tomorrow.getFullYear() &&
            date.getMonth() === tomorrow.getMonth() &&
            date.getDate() === tomorrow.getDate();

          if (isToday) return "היום";
          if (isTomorrow) return "מחר";
          return getDayName(session.date);
        })()}
      </div>

      {/* Title + Time */}
      <div style={styles.titleSection}>
        <h3 style={styles.title}>{session.type}</h3>
        <p style={styles.date}>
          {formatDate(session.date)} | {session.time}
        </p>
      </div>

      <div style={styles.divider} />

      {/* Details Grid */}
      <div style={styles.detailsGrid}>
        <div>
          <FaMapMarkerAlt style={styles.icon}></FaMapMarkerAlt>
          {session.location}
        </div>
        <div>
          <FaRegCommentDots style={styles.icon} />
          {session.notes || "ללא"}
        </div>
        <div>
          <FaUsers style={styles.icon} />
          {session.participants?.length ?? 0}/{session.maxParticipants} משתתפים
        </div>
        <div>
          <FaRegClock style={styles.icon} />
          {session.duration} דקות
        </div>
      </div>

      {/* Unregister Button */}
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
        onClick={() => handleUnregister(session._id)}
      >
        ביטול רישום
      </button>
    </div>
  );
};

export default WorkoutCard;

const styles = {
  card: {
    background: "#fff",
    padding: "32px 36px",
    borderRadius: "24px",
    border: "rgb(235, 235, 235) 0.8px solid",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "all 0.3s ease-in-out",
    marginBottom: "32px",
    position: "relative",
    minWidth: "240px",
    maxWidth: "500px",
    marginInline: "auto",
    marginTop: "18px",
  },
  titleSection: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#2f2f2f",
  },
  date: {
    margin: 0,
    fontSize: "0.95rem",
    color: "#777",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(to right, #e0e0e0, #fff)",
    opacity: 0.6,
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    rowGap: "16px",
    columnGap: "28px",
    color: "#4e4e4e",
    fontSize: "0.9rem",
  },
  unregBtn: {
    alignSelf: "center",
    background: "#f9f9f9",
    color: "#444",
    border: "1px solid transparent",
    borderRadius: "8px",
    width: "100%",
    padding: "6px 16px",
    fontSize: "1rem",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    boxShadow: "none",
  },
  icon: {
    marginLeft: "5px",
  },
};
