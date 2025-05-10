import React, { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import TopBar from "../../components/HomeComponents/TopBar";
import WorkoutSection from "../../components/HomeComponents/WorkoutSection";
import SignupSection from "../../components/HomeComponents/SignupSection";
import useSessions from "../../hooks/useSessions";

const HomePage = () => {
  // Auth context
  const { user, loading, sessions: upcomingWorkouts, auth } = useAuthContext();

  // Gender and full name
  const { gender, fullName } = user || {};

  // All sessions available
  const {
    sessions: availableSessions,
    loading: loadingSessions,
    error,
  } = useSessions();

  if (loading || loadingSessions)
    return <LoadingSpinner text="טוען פרטי משתמש..." />;

  return (
    <div style={styles.container}>
      <TopBar fullName={fullName} gender={gender} onLogout={auth.logout} />
      <WorkoutSection upcomingWorkouts={upcomingWorkouts} />
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
    minHeight: "100vh",
    direction: "rtl",
  },
};

export default HomePage;
