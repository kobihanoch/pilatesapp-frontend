import React, { useState } from "react";
import useAdminPageLogic from "../../hooks/AdminsHooks/useAdminPageLogic";
import LoadingSpinner from "../../components/Loading/LoadingSpinner.js";

const AdminDashboard = () => {
  const { allSessions, allUsers, loading } = useAdminPageLogic();
  if (loading) {
    return <LoadingSpinner text="טוען נתונים..." />;
  }
  return (
    <div>
      <h1>DASHBOARD</h1>
    </div>
  );
};

export default AdminDashboard;
