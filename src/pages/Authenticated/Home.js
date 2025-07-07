import React, { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import TopBar from "../../components/HomeComponents/TopBar";
import WorkoutSection from "../../components/HomeComponents/WorkoutSection";
import SignupSection from "../../components/HomeComponents/SignupSection";
import useSessions from "../../hooks/UsersHooks/useSessions";

const HomePage = () => {
  // Auth context
  const { loading, sessions: upcomingWorkouts } = useAuthContext();

  // All sessions available
  const {
    sessions: availableSessions,
    loading: loadingSessions,
    error,
  } = useSessions(new Date().toISOString().split("T")[0]);

  if (loading || loadingSessions)
    return <LoadingSpinner text="טוען פרטי משתמש..." />;

  return (
    <div style={styles.container}>
      <WorkoutSection />
      {availableSessions && (
        <SignupSection availableSessions={availableSessions ?? []} />
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
    backgroundColor: "white",
    padding: 0,
    height: "100vh",
    direction: "rtl",
    display: "flex",
    flexDirection: "column",
  },
};

export default HomePage;
