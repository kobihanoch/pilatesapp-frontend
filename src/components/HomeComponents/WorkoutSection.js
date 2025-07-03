import React, { useEffect, useState } from "react";
import WorkoutCard from "./UpcomingWorkoutsListComponents/WorkoutCard";
import { useAuthContext } from "../../context/authContext";
import { filterRegisteredSessionToThisWeekSessions } from "../../utils/sharedUtils";
import AllSessionsModal from "./UpcomingWorkoutsListComponents/AllSessionsModal";

const WorkoutSection = ({ upcomingWorkouts }) => {
  // All session user is registered to - SORTED
  const { sessions: updatedSessions, setSessions: setUpdatedSessions } =
    useAuthContext();

  // Sessions for this week only - SORTED
  const [sessionsThisWeek, setSessionsThisWeek] = useState(() => {
    return filterRegisteredSessionToThisWeekSessions(updatedSessions);
  });

  // Modal state for viewing all sessions user is registered to
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  // Update this week's upcoming sessions when all sessions user is registered to is loaded
  useEffect(() => {
    if (updatedSessions) {
      setSessionsThisWeek(
        filterRegisteredSessionToThisWeekSessions(updatedSessions)
      );
    }
  }, [updatedSessions]);

  return (
    <div style={{ flex: 4, width: "90%", alignSelf: "center" }}>
      <h3 style={styles.sectionTitle}>האימונים הקרובים שלי</h3>
      <h3 style={{ fontSize: "1rem", color: "grey", marginTop: -10 }}>
        צפייה באימונים אליהם את/ה רשום/ה השבוע
      </h3>

      {/* Sessions counter for the rest of the week */}
      {/* >>>>>>>>>>>>> WIP - Need to style, add all upcoming workouts modal to view a list of them <<<<<<<<<<<<< */}
      <p>
        {sessionsThisWeek.upcomingSessions.length -
          sessionsThisWeek.cancledSessionsCount ===
        1
          ? "נשאר עוד אימון אחד השבוע"
          : "נשארו עוד " +
            (sessionsThisWeek.upcomingSessions.length -
              sessionsThisWeek.cancledSessionsCount) +
            " אימונים השבוע"}
      </p>

      {/* CTA for viewing all upcoming sessions */}
      <button onClick={() => setShowSessionsModal(true)}>צפייה בהכל</button>

      {/* All sessions user is registered to modal */}
      <AllSessionsModal
        isOpen={showSessionsModal}
        onClose={() => setShowSessionsModal(false)}
        sessions={updatedSessions}
        setUpdatedSessions={setUpdatedSessions}
        updatedSessions={updatedSessions}
      ></AllSessionsModal>

      <div style={styles.horizontalScroll}>
        {sessionsThisWeek?.upcomingSessions.length > 0 ? (
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
  );
};

const styles = {
  sectionTitle: {
    fontSize: "1.7rem",
    color: "black",
    marginBottom: 12,
    marginTop: 20,
  },
  horizontalScroll: {
    display: "flex",
    overflowX: "auto",
    gap: 12,
    padding: "10px 16px",
    scrollSnapType: "x mandatory",
    direction: "rtl",
    scrollBehavior: "smooth",
    marginRight: 10,
  },
};

export default WorkoutSection;
