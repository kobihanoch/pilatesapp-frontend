import React from "react";
import { useAuthContext } from "../../context/authContext";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import TopBar from "../../components/HomeComponents/TopBar";
import WorkoutSection from "../../components/HomeComponents/WorkoutSection";
import SignupSection from "../../components/HomeComponents/SignupSection";

const HomePage = () => {
  const { user, loading, sessions: upcomingWorkouts, auth } = useAuthContext();
  const { gender, fullName } = user || {};

  const availableSessions = [
    { title: "פילאטיס קלאסי", date: "4.5.25 | 09:00" },
    { title: "פילאטיס לנשים בהריון", date: "5.5.25 | 11:00" },
    { title: "פילאטיס לנוער", date: "6.5.25 | 17:30" },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  if (loading) return <LoadingSpinner text="טוען פרטי משתמש..." />;

  return (
    <div style={styles.container}>
      <TopBar fullName={fullName} gender={gender} onLogout={auth.logout} />
      <WorkoutSection
        upcomingWorkouts={upcomingWorkouts}
        formatDate={formatDate}
      />
      <SignupSection availableSessions={availableSessions} />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
    backgroundColor: "#fff0db",
    padding: 0,
    minHeight: "100vh",
    direction: "rtl",
  },
};

export default HomePage;
