import React from "react";
import { FaMapMarkerAlt, FaUsers, FaTimes } from "react-icons/fa";
import { unregisterFromSelectedSession } from "../../../services/sessionService";
import { formatDate, getDayName } from "../../../utils/homeUtils";
import { useErrorContext } from "../../../context/errorContext";
import { toast } from "react-toastify";

const getStatusStyle = (status) => ({
  display: "inline-block",
  padding: "6px 18px",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: "600",
  background: "linear-gradient(135deg, #4fc3f7, #0288d1)",
  color: "#fff",
  textAlign: "center",
  letterSpacing: "0.5px",
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
    <div
      style={{
        background: "#fff",
        padding: "40px 48px",
        borderRadius: "28px",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        transition: "all 0.3s ease-in-out",
        marginBottom: "40px",
        position: "relative",
        minWidth: "280px",
        maxWidth: "500px",
        marginInline: "auto",
      }}
    >
      {/* Day label */}
      <div style={getStatusStyle(session.status)}>
        {(() => {
          const date = new Date(session.date);
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);

          const isTomorrow =
            date.getFullYear() === tomorrow.getFullYear() &&
            date.getMonth() === tomorrow.getMonth() &&
            date.getDate() === tomorrow.getDate();

          return isTomorrow ? "מחר" : getDayName(session.date);
        })()}
      </div>

      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#333",
          }}
        >
          {session.type}
        </h3>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "#6e6e6e" }}>
          {formatDate(session.date)} | {session.time}
        </p>
      </div>

      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, #4FC3F7, #fff)",
          opacity: 0.7,
        }}
      ></div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "20px",
          columnGap: "32px",
          color: "#4e4e4e",
          fontSize: "0.95rem",
        }}
      >
        <div>
          <strong>מיקום:</strong>
          <br />
          <FaMapMarkerAlt style={{ marginInlineStart: 6 }} /> {session.location}
        </div>
        <div>
          <strong>הערות:</strong>
          <br />
          {session.notes || "ללא"}
        </div>
        <div>
          <strong>משתתפים:</strong>
          <br />
          <FaUsers style={{ marginInlineStart: 6 }} />{" "}
          {session.participants?.length ?? 0}/{session.maxParticipants}
        </div>
      </div>

      <button
        style={{
          alignSelf: "center",
          width: "56px",
          aspectRatio: "1",
          borderRadius: "50%",
          border: "none",
          background: "#ff6b6b",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#e34e4e";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ff6b6b";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onClick={() => handleUnregister(session._id)}
        title="בטל רישום"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default WorkoutCard;
