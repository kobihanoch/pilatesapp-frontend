import React, { useEffect, useState } from "react";
import WorkoutCard from "./UpcomingWorkoutsListComponents/WorkoutCard";
import { useAuthContext } from "../../context/authContext";
import { filterRegisteredSessionToThisWeekSessions } from "../../utils/sharedUtils";

const WorkoutSection = ({ upcomingWorkouts }) => {
  // Show only future/todays upcoming sessions
  const todayStart = new Date().setHours(0, 0, 0, 0);
  // All session user is registered to - SORTED
  const { sessions: updatedSessions, setSessions: setUpdatedSessions } =
    useAuthContext();

  // Sessions for this week only - SORTED
  const [sessionsThisWeek, setSessionsThisWeek] = useState(() => {
    return filterRegisteredSessionToThisWeekSessions(updatedSessions);
  });

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
      <p>
        {sessionsThisWeek.length == 1
          ? "נשאר עוד אימון אחד השבוע"
          : "נשארו עוד " + sessionsThisWeek.length + " אימונים השבוע"}
      </p>
      <button>צפייה בהכל</button>
      <div style={styles.horizontalScroll}>
        {sessionsThisWeek?.length > 0 ? (
          sessionsThisWeek.map((session) => (
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
