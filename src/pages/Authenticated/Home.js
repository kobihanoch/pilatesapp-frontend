import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const HomePage = () => {
  const { user, loading, sessions: upcomingWorkouts, auth } = useAuthContext();
  const { gender, fullName } = user || {};
  const availableSessions = [
    { title: "פילאטיס קלאסי", date: "4.5.25 | 09:00" },
    { title: "פילאטיס לנשים בהריון", date: "5.5.25 | 11:00" },
    { title: "פילאטיס לנוער", date: "6.5.25 | 17:30" },
  ];

  if (loading) return <LoadingSpinner text="טוען פרטי משתמש..." />;
  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h2 style={styles.userName}>
          ברוך {gender === "male" ? "הבא" : "הבאה"}, {fullName}
        </h2>
        <button style={styles.logoutButton} onClick={() => auth.logout()}>
          התנתקות
        </button>
      </div>

      <h3 style={styles.sectionTitle}>האימונים הקרובים שלי:</h3>
      <div style={styles.horizontalScroll}>
        {upcomingWorkouts.length > 0 ? (
          upcomingWorkouts.map((session) => (
            <div key={session._id} style={styles.workoutCard}>
              <div
                style={{
                  height: "30%",
                  width: "80%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={styles.cardDate}>{session.date}</p>
                <p style={styles.cardDate}>{session.time}</p>
              </div>
              <h4 style={styles.cardTitle}>{session.type}</h4>
              <button style={styles.cancelButton}>ביטול הרשמה</button>
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: 20 }}>אין אימונים קרובים</p>
          </div>
        )}
      </div>

      <h3 style={styles.sectionTitle}>הרשמה לאימונים</h3>
      <div style={styles.sessionList}>
        {availableSessions.map((s, i) => (
          <div key={i} style={styles.sessionItem}>
            <p style={styles.sessionText}>
              {s.title} - {s.date}
            </p>
            <button style={styles.signupButton}>להירשם</button>
          </div>
        ))}
      </div>
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
  topBar: {
    backgroundColor: "#f4b183",
    padding: "16px 20px",
    borderRadius: "12px",
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#d76629",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: 16,
    cursor: "pointer",
  },
  userName: {
    fontSize: 20,
    margin: 0,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#d76629",
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
  },
  workoutCard: {
    minWidth: 220,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    color: "#222",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    flexShrink: 0,
    scrollSnapAlign: "start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.2s ease-in-out",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardDate: {
    fontSize: 18,
    color: "#666",
  },
  cancelButton: {
    marginTop: 12,
    backgroundColor: "#ffe5e5",
    color: "#b30000",
    border: "none",
    padding: "10px",
    borderRadius: 8,
    fontSize: 15,
    cursor: "pointer",
    fontWeight: "500",
  },

  sessionList: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 20,
  },
  sessionItem: {
    backgroundColor: "#fff",
    padding: "14px 16px",
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionText: {
    fontSize: 16,
    color: "#333",
  },
  signupButton: {
    backgroundColor: "#f4b183",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 15,
    cursor: "pointer",
  },
};

export default HomePage;
