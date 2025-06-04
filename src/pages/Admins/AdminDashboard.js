import React, { useState } from "react";
import useAdminPageLogic from "../../hooks/AdminsHooks/useAdminPageLogic";
import LoadingSpinner from "../../components/Loading/LoadingSpinner.js";
import UsersSection from "../../components/AdminDashboardComponents/UsersSection.js";
import SessionsSection from "../../components/AdminDashboardComponents/SessionsSection.js";

const AdminDashboard = () => {
  const { allSessions, allUsers, loading } = useAdminPageLogic();
  const [visibleTable, setVisibleTable] = useState("sessions");

  const renderTable = () => {
    switch (visibleTable) {
      case "users":
        return <UsersSection></UsersSection>;
      case "sessions":
        return <SessionsSection></SessionsSection>;
      default:
        return <SessionsSection></SessionsSection>;
    }
  };

  if (loading) {
    return <LoadingSpinner text="טוען נתונים..." />;
  }
  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <button onClick={() => setVisibleTable("users")}>ניהול משתמשים</button>
        <button onClick={() => setVisibleTable("sessions")}>
          ניהול אימונים
        </button>
      </div>
      <div>{renderTable()}</div>
    </div>
  );
};

export default AdminDashboard;
