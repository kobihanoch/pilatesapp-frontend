import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiAward, FiCheckCircle } from "react-icons/fi";
import { useAuthContext } from "../../context/authContext";
import {
  filterUpcomingSessionsToAWeekAhead,
  filterUpcomingSessionsToThisWeek,
  filterUpcomingSessionToThisWeek,
} from "../../utils/sharedUtils";
import AllSessionsModal from "./UpcomingWorkoutsListComponents/AllSessionsModal";
import WorkoutCard from "./UpcomingWorkoutsListComponents/WorkoutCard";

/* ---------- Motion variants ---------- */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  hover: { scale: 1.04 },
  tap: { scale: 0.96 },
};

const listVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 130 },
  }),
};

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContent = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, type: "spring" },
  },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
};

const WorkoutSection = () => {
  const {
    completedSessions,
    sessions: updatedSessions,
    setSessions: setUpdatedSessions,
    user,
  } = useAuthContext();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Sessions for this sunday to saturday week
  const [sessionsThisWeek, setSessionsThisWeek] = useState(() => {
    return filterUpcomingSessionsToThisWeek(updatedSessions);
  });

  // Sessions for a week ahead
  const [sessionsInAWeekPeriod, setSessionsInAWeekPeriod] = useState(() => {
    return filterUpcomingSessionsToAWeekAhead(updatedSessions);
  });

  // Sessions completed this sunday to saturday period
  const [completedSessionsThisWeek, setCompletedSessionsThisWeek] = useState(
    () => {
      return filterUpcomingSessionsToThisWeek(completedSessions);
    }
  );

  const [showSessionsModal, setShowSessionsModal] = useState(false);

  // Use effects for live updates
  useEffect(() => {
    setSessionsThisWeek(filterUpcomingSessionsToThisWeek(updatedSessions));
    setSessionsInAWeekPeriod(
      filterUpcomingSessionsToAWeekAhead(updatedSessions)
    );
  }, [updatedSessions]);

  useEffect(() => {
    setCompletedSessionsThisWeek(
      filterUpcomingSessionsToThisWeek(completedSessions)
    );
  }, [completedSessions]);

  // Stats calculating
  const remaining =
    sessionsThisWeek.upcomingSessions.length -
    sessionsThisWeek.cancledSessionsCount;
  const completed = completedSessionsThisWeek?.upcomingSessions.length || 0;
  const total = remaining + completed;
  const progress = total ? (completed / total) * 100 : 0;

  return (
    <motion.div
      style={{ flex: 4, width: "90%", alignSelf: "center" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ----- Header greeting ----- */}
      <motion.div
        style={{ textAlign: "center", marginBottom: 24 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1e293b" }}>
          שלום, {user?.fullName}! 👋
        </h2>
        <p style={{ color: "#64748b", fontSize: "0.95rem", marginTop: 6 }}>
          הנה הסקירה השבועית שלך לאימונים הקרובים
        </p>
        <span style={styles.totalBadge}>
          סה"כ {completedSessions.length} אימונים עד כה
        </span>
      </motion.div>

      {/* ----- Weekly stats box ----- */}
      <motion.div
        style={styles.statsContainer}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 style={styles.heading}>נתוני האימונים לשבוע הנוכחי</h3>

        <div style={styles.cardsWrapper}>
          <motion.div
            style={styles.statCard}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            key={completed}
          >
            <FiCheckCircle style={styles.icon} />
            <p style={styles.count}>{completed}</p>
            <p style={styles.label}>אימונים בוצעו</p>
          </motion.div>

          <motion.div
            style={{
              ...styles.statCard,
              background: "white",
              boxShadow: "none",
              border: "rgb(235,235,235) 0.8px solid",
            }}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            key={remaining}
          >
            <FiAward style={{ ...styles.icon, color: "#334155" }} />
            <p style={{ ...styles.count, color: "#1e293b" }}>{remaining}</p>
            <p style={{ ...styles.label, color: "#475569" }}>אימונים נותרו</p>
          </motion.div>
        </div>

        {/* Progress bar with label */}
        {total > 0 && (
          <div>
            <p
              style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 8 }}
            >
              התקדמות שבועית — {Math.round(progress)}%
            </p>
            <motion.div style={styles.progressBar}>
              <motion.div
                style={{
                  ...styles.progressFill,
                  backgroundColor: progress === 100 ? "#34d399" : "#D7BFA6",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
              />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* ----- Header & CTA ----- */}
      <div
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: 12,
        }}
      >
        <div style={styles.headerRow}>
          <h3 style={styles.sectionTitle}>אימונים קרובים</h3>
          <motion.button
            style={styles.viewAllBtn}
            whileHover={{ scale: 1.05, opacity: 1 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowSessionsModal(true)}
            onMouseDown={(e) => e.preventDefault()}
          >
            צפייה בהכל {">"}
          </motion.button>
        </div>

        <AnimatePresence>
          {showSessionsModal && (
            <motion.div
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: 99,
              }}
            >
              <motion.div
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ zIndex: 100 }}
              >
                <AllSessionsModal
                  isOpen={showSessionsModal}
                  onClose={() => setShowSessionsModal(false)}
                  sessions={updatedSessions}
                  setUpdatedSessions={setUpdatedSessions}
                  updatedSessions={updatedSessions}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={styles.horizontalScroll}
          drag={isMobile ? false : "x"}
          dragConstraints={isMobile ? undefined : { left: -120, right: 120 }}
          dragElastic={isMobile ? undefined : 0.08}
        >
          {sessionsInAWeekPeriod?.upcomingSessions.length ? (
            sessionsInAWeekPeriod.upcomingSessions.map((session, idx) => (
              <motion.div
                key={session._id}
                custom={idx}
                variants={listVariants}
                initial="hidden"
                animate="visible"
                style={{ scrollSnapAlign: "start" }}
              >
                <WorkoutCard
                  session={session}
                  updatedSessions={updatedSessions}
                  setUpdatedSessions={setUpdatedSessions}
                />
              </motion.div>
            ))
          ) : (
            <p style={{ padding: 16 }}>אין אימונים קרובים</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const styles = {
  statsContainer: {
    borderRadius: 12,
    padding: 24,
    maxWidth: 500,
    margin: "0 auto",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  heading: {
    fontSize: "1.15rem",
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
    background: "linear-gradient(135deg, #D7BFA6, rgb(183, 164, 144))",
    borderRadius: 12,
    padding: 16,
    minWidth: 100,
    maxWidth: 100,
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
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
  totalBadge: {
    display: "inline-block",
    backgroundColor: "#D7BFA6",
    color: "white",
    fontSize: "0.85rem",
    fontWeight: 600,
    padding: "6px 12px",
    borderRadius: 999,
    marginTop: 10,
  },
};

export default WorkoutSection;
