import React from "react";
import AllSessionsTable from "./AllSessionsTable";

const SessionsSection = ({ sessions }) => {
  return (
    <div>
      <div style={{ width: "100%", height: "150vh" }}>
        <AllSessionsTable sessions={sessions} />
      </div>
    </div>
  );
};

export default SessionsSection;
