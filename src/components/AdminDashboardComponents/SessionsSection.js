import React, { useEffect, useState } from "react";
import AllSessionsTable from "./AllSessionsTable";

const SessionsSection = ({ sessions }) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSortFieldChange = (e) => setSortField(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  useEffect(() => {
    // Make debounced search request
    console.log("Create search");
  }, [search, sortField, sortOrder]);

  return (
    <div
      style={{
        direction: "rtl",
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          margin: "1rem",
        }}
      >
        <div style={{ width: "100%" }}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="חיפוש לפי שעה, סוג, מיקום או הערות..."
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              width: "100%",
              backgroundColor: "#f9fafb",
              boxSizing: "border-box",
              display: "block",
            }}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <select
            value={sortField}
            onChange={handleSortFieldChange}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              width: "100%",
              backgroundColor: "#f9fafb",
              boxSizing: "border-box",
            }}
          >
            <option value="date">תאריך</option>
            <option value="type">סוג</option>
            <option value="time">שעה</option>
            <option value="location">מיקום</option>
          </select>

          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              width: "100%",
              backgroundColor: "#f9fafb",
              boxSizing: "border-box",
            }}
          >
            <option value="asc">סדר עולה</option>
            <option value="desc">סדר יורד</option>
          </select>
        </div>
      </div>

      <div style={{ width: "100%", height: "auto" }}>
        <AllSessionsTable sessions={sessions} />
      </div>
    </div>
  );
};

export default SessionsSection;
