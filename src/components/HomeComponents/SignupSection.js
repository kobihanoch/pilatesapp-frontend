import React, { useState, useEffect } from "react";
import AvailableSessionItem from "./SignUpSectionListComponents/AvailableSessionItem";
import SelectDate from "./SignUpSectionListComponents/SelectDate";
import { fetchAllSessionsForYear } from "../../services/sessionService";
import { useErrorContext } from "../../context/errorContext";
import { motion } from "framer-motion";

/* ---------- Motion variants ---------- */
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const listVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, type: "spring", stiffness: 120 },
  }),
};

const SignupSection = ({ availableSessions }) => {
  const { setError } = useErrorContext();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [sessions, setSessions] = useState(() =>
    availableSessions.filter((ses) => ses.date.split("T")[0] === selectedDate)
  );

  useEffect(() => {
    const fetchSessions = async () => {
      const selected = new Date(selectedDate);
      const currentYear = new Date().getFullYear();
      const isDateInCurrentYear = selected.getFullYear() === currentYear;

      if (!isDateInCurrentYear) {
        try {
          const sessionsF = await fetchAllSessionsForYear(selectedDate);
          setSessions(() =>
            sessionsF.filter((ses) => ses.date.split("T")[0] === selectedDate)
          );
        } catch (e) {
          setError(e);
        }
      } else {
        setSessions(() =>
          availableSessions.filter(
            (ses) => ses.date.split("T")[0] === selectedDate
          )
        );
      }
    };

    fetchSessions();
  }, [selectedDate]);

  return (
    <motion.div
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h3 style={styles.sectionTitle}>אימונים זמינים להרשמה</h3>
        <motion.p
          style={styles.subTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          בחרו תאריך רצוי לאימון
        </motion.p>
      </div>

      <motion.div
        style={{ paddingLeft: 20, paddingRight: 20 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <SelectDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </motion.div>

      <motion.div style={styles.sessionsList}>
        {sessions && sessions.length > 0 ? (
          sessions.map((ses, idx) => (
            <motion.div
              key={ses._id}
              custom={idx}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              style={{ flex: "0 0 auto" }}
            >
              <AvailableSessionItem
                session={ses}
                setAllSessions={setSessions}
              />
            </motion.div>
          ))
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            לא נמצאו אימונים לתאריך זה
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: "auto auto auto 1fr",
    width: "90%",
    margin: "0 auto",
    gap: 20,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    borderRadius: 12,
    marginTop: 40,
  },
  sectionTitle: {
    color: "#0f172a",
    fontWeight: 700,
    fontSize: "1.15rem",
    marginBottom: 6,
  },
  subTitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    marginBottom: 10,
    textAlign: "center",
  },
  sessionsList: {
    overflowX: "auto",
    borderRadius: 10,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: 20,
    padding: "0 20px 20px",
  },
};

export default SignupSection;
