import React from "react";
import { formatDate } from "../../../utils/homeUtils";

const getStatusStyle = (status) => {
  const base = {
    position: "absolute",
    top: "16px",
    left: "16px",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#fff",
  };

  switch (status) {
    case "בוטל":
      return { ...base, backgroundColor: "#EF5350" };
    case "הושלם":
      return { ...base, backgroundColor: "#9CCC65" };
    default:
      return { ...base, backgroundColor: "#FFB74D" };
  }
};

const AvailableSessionItem = ({ session }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        marginBottom: "20px",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "box-shadow 0.3s ease",
        position: "relative", // enable absolute label
      }}
    >
      {/* Status Label */}
      <div style={getStatusStyle(session.status)}>{session.status}</div>

      {/* Header Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#E0F7FA",
            borderRadius: "12px",
            flexShrink: 0,
          }}
        ></div>
        <div>
          <p style={{ fontWeight: "600", fontSize: "1.1rem", margin: 0 }}>
            {session.type}
          </p>
          <p style={{ fontSize: "0.85rem", margin: 0, color: "#6B6B6B" }}>
            {formatDate(session.date)} | {session.time}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: "#EEEEEE",
          width: "100%",
        }}
      ></div>

      {/* Details Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "8px",
          columnGap: "12px",
          fontSize: "0.85rem",
          color: "#4B4B4B",
        }}
      >
        <div>
          <strong>מיקום:</strong> <br />
          {session.location}
        </div>
        <div>
          <strong>הערות:</strong> <br />
          {session.notes}
        </div>
        <div>
          <strong>משתתפים:</strong> <br />
          {session.maxParticipants} / {session.participants.length}
        </div>
      </div>

      {/* CTA */}
      <button
        style={{
          marginTop: "12px",
          width: "100%",
          height: "44px",
          backgroundColor: "#4FC3F7",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          fontWeight: "600",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#29B6F6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#4FC3F7";
        }}
      >
        הרשמה
      </button>
    </div>
  );
};

export default AvailableSessionItem;
