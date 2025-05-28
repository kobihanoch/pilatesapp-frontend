import React, { useState } from "react";
import WorkoutCard from "./UpcomingWorkoutsListComponents/WorkoutCard";
import { useAuthContext } from "../../context/authContext";

const WorkoutSection = ({ upcomingWorkouts }) => {
  // Show only future/todays upcoming sessions
  const todayStart = new Date().setHours(0, 0, 0, 0);
  /*const [updatedSessions, setUpdatedSessions] = useState(
    upcomingWorkouts
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .filter((s) => new Date(s.date) >= todayStart)
  );*/
  const { sessions: updatedSessions, setSessions: setUpdatedSessions } =
    useAuthContext();

  return (
    <div style={{ flex: 4, width: "90%", alignSelf: "center" }}>
      <h3 style={styles.sectionTitle}>האימונים הקרובים שלי</h3>
      <div style={styles.horizontalScroll}>
        {updatedSessions?.length > 0 ? (
          updatedSessions.map((session) => (
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
    fontSize: 25,
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
