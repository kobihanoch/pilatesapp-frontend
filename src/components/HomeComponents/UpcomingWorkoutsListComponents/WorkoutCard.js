import React from "react";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const WorkoutCard = ({ session, formatDate }) => {
  return (
    <div
      style={styles.workoutCard}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={styles.cardTop}>
        <div style={styles.dateBox}>
          <p style={styles.cardDate}>{formatDate(session.date)}</p>
          <p style={styles.cardTime}>{session.time}</p>
        </div>
        <span style={styles.statusBadge(session.status)}>{session.status}</span>
      </div>

      <h4 style={styles.cardTitle}>{session.type}</h4>

      <div style={styles.infoRow}>
        <FaMapMarkerAlt style={styles.icon} />
        <p style={styles.cardInfo}>{session.location}</p>
      </div>

      <div style={styles.infoRow}>
        <FaUsers style={styles.icon} />
        <p style={styles.cardInfo}>
          {session.participants?.length ?? 0}/{session.maxParticipants} משתתפים
        </p>
      </div>

      {session.notes && <p style={styles.cardNotes}>הערה: {session.notes}</p>}

      <button style={styles.cancelButton}>ביטול הרשמה</button>
    </div>
  );
};

const styles = {
  workoutCard: {
    minWidth: 260,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    color: "#222",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    flexShrink: 0,
    scrollSnapAlign: "start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  dateBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cardDate: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  cardTime: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  statusBadge: (status) => ({
    fontSize: 12,
    padding: "4px 10px",
    borderRadius: "12px",
    backgroundColor:
      status === "בוטל"
        ? "#ffe5e5"
        : status === "הושלם"
        ? "#e0ffe0"
        : "#e6f4ff",
    color: status === "בוטל" ? "#a00" : status === "הושלם" ? "#0a0" : "#0077cc",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  }),
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  icon: {
    marginLeft: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: "#444",
  },
  cardNotes: {
    fontSize: 13,
    color: "#555",
    fontStyle: "italic",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  cancelButton: {
    marginTop: "auto",
    alignSelf: "stretch",
    backgroundColor: "#ffeaea",
    color: "#aa0000",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    fontSize: 15,
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    marginTop: 16,
  },
};

export default WorkoutCard;
