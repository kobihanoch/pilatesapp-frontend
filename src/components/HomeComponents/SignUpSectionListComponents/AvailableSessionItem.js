import React from "react";
import { formatDate } from "../../../utils/homeUtils";

const AvailableSessionItem = ({ session }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "150px",
        marginBottom: "12px",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <p>{formatDate(session.date)}</p>
      <p>{session.time}</p>
    </div>
  );
};

export default AvailableSessionItem;
