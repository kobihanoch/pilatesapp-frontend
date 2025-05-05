import React from "react";
import WorkoutCard from "./UpcomingWorkoutsListComponents/WorkoutCard";

const WorkoutSection = ({ upcomingWorkouts, formatDate }) => (
  <>
    <h3 style={styles.sectionTitle}>האימונים הקרובים שלי</h3>
    <div style={styles.horizontalScroll}>
      {upcomingWorkouts?.length > 0 ? (
        upcomingWorkouts.map((session) => (
          <WorkoutCard
            key={session._id}
            session={session}
            formatDate={formatDate}
          />
        ))
      ) : (
        <p style={{ padding: 16 }}>אין אימונים קרובים</p>
      )}
    </div>
  </>
);

const styles = {
  sectionTitle: {
    fontSize: 25,
    color: "black",
    marginBottom: 12,
    marginTop: 20,
    paddingRight: 10,
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
