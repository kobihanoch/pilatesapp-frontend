import React, { useState } from "react";
import useAdminPageLogic from "../../hooks/AdminsHooks/useAdminPageLogic";

const AdminDashboard = () => {
  const { allSessions } = useAdminPageLogic();
  return (
    <div>
      <h1>DASHBOARD</h1>
    </div>
  );
};

export default AdminDashboard;
