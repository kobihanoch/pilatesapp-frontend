import React from "react";
import { formatDate, getDayName } from "../../../utils/homeUtils";
import { registerToSelectedSession } from "../../../services/sessionService";
import { useErrorContext } from "../../../context/errorContext";
import { useAuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import { FiMapPin } from "react-icons/fi";
import {
  FaMapMarked,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMarkdown,
  FaMarker,
  FaRegClock,
  FaRegCommentDots,
  FaStickyNote,
  FaUsers,
} from "react-icons/fa";

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

const AvailableSessionItem = ({ session, setAllSessions }) => {
  const { setError } = useErrorContext();
  const { setSessions } = useAuthContext();

  const registerToSession = async (sessionId) => {
    try {
      const res = await registerToSelectedSession(sessionId);
      // Set sessions user is registered to (context) (auto sorintg in component)
      setSessions((prev) => [...prev, res.session]);
      // Update live available sessions
      setAllSessions((prev) =>
        prev.map((session) =>
          session._id === sessionId ? res.session : session
        )
      );
      toast.success("ההרשמה בוצעה בהצלחה");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div style={styles.card}>
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
          <FaMapMarkerAlt style={{ marginLeft: "5px" }}></FaMapMarkerAlt>
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

      {/* Register Button */}
      <button
        type="button"
        title="הרשמה"
        disabled={session?.status === "הושלם"}
        style={styles.registerBtn}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgb(171, 151, 130)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgb(215, 191, 166)";
        }}
        onClick={() => registerToSession(session._id)}
      >
        הרשמה
      </button>
    </div>
  );
};

export default AvailableSessionItem;

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
    opacity: (session) => (session?.status === "הושלם" ? 0.5 : 1),
  },
  icon: {
    marginLeft: "5px",
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
  registerBtn: {
    alignSelf: "center",
    background: "rgb(215, 191, 166)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    padding: "10px 16px",
    fontSize: "1rem",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    boxShadow: "none",
  },
};
