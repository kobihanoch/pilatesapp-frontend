import React from "react";
import useAdminPageLogic from "../../hooks/AdminsHooks/useAdminPageLogic";

const AdminDashboard = () => {
  const { allSessions } = useAdminPageLogic();
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
