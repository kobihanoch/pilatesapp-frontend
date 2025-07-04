import React, { useEffect, useState } from "react";
import WorkoutCard from "./UpcomingWorkoutsListComponents/WorkoutCard";
import AllSessionsModal from "./UpcomingWorkoutsListComponents/AllSessionsModal";
import { useAuthContext } from "../../context/authContext";
import { filterRegisteredSessionToThisWeekSessions } from "../../utils/sharedUtils";
import { FiCheckCircle, FiCalendar, FiTarget, FiAward } from "react-icons/fi";

const WorkoutSection = () => {
  /* ---------- Context ---------- */
  // All session user is registered to - SORTED
  const {
    completedSessions,
    sessions: updatedSessions,
    setSessions: setUpdatedSessions,
  } = useAuthContext();

  /* ---------- This-week data ---------- */
  // Sessions for this week only - SORTED
  const [sessionsThisWeek, setSessionsThisWeek] = useState(() => {
    return filterRegisteredSessionToThisWeekSessions(updatedSessions);
  });

  // Completed sessions for this week only - SORTED
  const [completedSessionsThisWeek, setCompletedSessionsThisWeek] = useState(
    () => {
      // Use same logic to here
      return filterRegisteredSessionToThisWeekSessions(completedSessions);
    }
  );

  /* ---------- Modal ---------- */
  // Modal state for viewing all sessions user is registered to
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  /* ---------- Sync on sessions change ---------- */
  // Update this week's upcoming sessions on changing sessions registration
  useEffect(() => {
    if (updatedSessions) {
      setSessionsThisWeek(
        filterRegisteredSessionToThisWeekSessions(updatedSessions)
      );
    }
  }, [updatedSessions]);

  /* ---------- Derived numbers ---------- */
  const remaining =
    sessionsThisWeek.upcomingSessions.length -
    sessionsThisWeek.cancledSessionsCount;
  const completed = completedSessionsThisWeek?.upcomingSessions.length || 0;
  const total = remaining + completed;
  const progress = total ? (completed / total) * 100 : 0;

  /* ---------- Render ---------- */
  return (
    <div style={{ flex: 4, width: "90%", alignSelf: "center" }}>
      {/* ----- Weekly stats box ----- */}
      <div style={styles.statsContainer}>
        <h3 style={styles.heading}>נתוני האימונים לשבוע הנוכחי</h3>

        <div style={styles.cardsWrapper}>
          {/* Completed */}
          <div style={styles.statCard}>
            <FiCheckCircle style={styles.icon} />
            <p style={styles.count}>{completed}</p>
            <p style={styles.label}>אימונים בוצעו</p>
          </div>

          {/* Remaining */}
          <div
            style={{
              ...styles.statCard,
              background: "white",
              boxShadow: "none",
              border: "rgb(235, 235, 235) 0.8px solid",
            }}
          >
            <FiAward style={{ ...styles.icon, color: "#334155" }} />
            <p style={{ ...styles.count, color: "#1e293b" }}>{remaining}</p>
            <p style={{ ...styles.label, color: "#475569" }}>אימונים נותרו</p>
          </div>
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
                backgroundColor: progress === 100 ? "#34d399" : "#4FC3F7",
              }}
            />
          </div>
        )}
      </div>

      {/* ----- Header & CTA ----- */}
      <div
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: 12,
        }}
      >
        <div style={styles.headerRow}>
          <h3 style={styles.sectionTitle}>אימונים קרובים</h3>
          <button
            style={styles.viewAllBtn}
            onClick={() => setShowSessionsModal(true)}
            onMouseDown={(e) => e.preventDefault()}
          >
            צפייה בהכל {">"}
          </button>
        </div>

        {/* ----- Modal ----- */}
        <AllSessionsModal
          isOpen={showSessionsModal}
          onClose={() => setShowSessionsModal(false)}
          sessions={updatedSessions}
          setUpdatedSessions={setUpdatedSessions}
          updatedSessions={updatedSessions}
        />

        {/* ----- Horizontal list of upcoming sessions ----- */}
        <div style={styles.horizontalScroll}>
          {sessionsThisWeek?.upcomingSessions.length ? (
            sessionsThisWeek.upcomingSessions.map((session) => (
              <WorkoutCard
                key={session._id}
                session={session}
                updatedSessions={updatedSessions}
                setUpdatedSessions={setUpdatedSessions}
              />
            ))
          ) : (
            <p style={{ padding: 16 }}>אין אימונים קרובים</p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- Styles ---------- */
const styles = {
  /* weekly stats box */
  statsContainer: {
    borderRadius: 12,
    padding: 24,
    maxWidth: 500,
    margin: "0 auto",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  heading: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: 20,
    color: "#1e293b",
  },
  cardsWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: 24,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  statCard: {
    background: "linear-gradient(135deg, #29B6F6,rgb(102, 199, 244))", // gradient כחול מודרני
    borderRadius: 12,
    padding: 16,
    minWidth: 100,
    maxWidth: 100,
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)", // טיפה יותר בולט
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s ease-in-out",
    color: "white",
  },

  icon: {
    fontSize: "1.6rem",
    marginBottom: 6,
    color: "white",
  },
  count: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: 2,
    color: "white",
  },
  label: {
    fontSize: "0.9rem",
    color: "white",
    fontWeight: 1000,
  },
  progressBar: {
    backgroundColor: "#e2e8f0",
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 28,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    transition: "width 0.4s ease-in-out",
  },

  /* header & list */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionTitle: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "1.15rem",
    marginBottom: 8,
  },
  viewAllBtn: {
    background: "transparent",
    color: "#0f172a",
    border: "none",
    padding: 0,
    opacity: 0.6,
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
    WebkitTapHighlightColor: "transparent",
    outline: "none",
    marginTop: 8,
  },
  horizontalScroll: {
    display: "flex",
    overflowX: "auto",
    gap: 16,
    scrollSnapType: "x mandatory",
    direction: "rtl",
    scrollBehavior: "smooth",
    padding: "8px 8px 24px",
  },
};

export default WorkoutSection;
