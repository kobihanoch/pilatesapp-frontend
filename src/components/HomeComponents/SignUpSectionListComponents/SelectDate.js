import React from "react";
import { addComponentToDate, getDayName } from "../../../utils/homeUtils";

const days = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const years = ["2025", "2026"];

const SelectDate = ({ selectedDate, setSelectedDate }) => {
  const handleChange = (component) => (e) => {
    setSelectedDate(
      addComponentToDate(selectedDate, component, e.target.value)
    );
  };

  const showDayName =
    selectedDate.split("-").filter((v) => v).length === 3
      ? getDayName(selectedDate)
      : "";

  return (
    <div style={{ direction: "rtl", width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        {/* Day */}
        <div style={containerStyle}>
          <label style={labelStyle}>יום</label>
          <select
            value={selectedDate.split("-")[2]}
            onChange={handleChange("day")}
            style={selectStyle}
          >
            <option value="">--</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div style={containerStyle}>
          <label style={labelStyle}>חודש</label>
          <select
            value={selectedDate.split("-")[1]}
            onChange={handleChange("month")}
            style={selectStyle}
          >
            <option value="">--</option>
            {months.map((month, i) => (
              <option key={month} value={month}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div style={containerStyle}>
          <label style={labelStyle}>שנה</label>
          <select
            value={selectedDate.split("-")[0]}
            onChange={handleChange("year")}
            style={selectStyle}
          >
            <option value="">--</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display selected weekday */}
      {showDayName && (
        <div
          style={{
            textAlign: "center",
            color: "#4FC3F7",
            fontWeight: "600",
            fontSize: "0.95rem",
          }}
        >
          {showDayName}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
};

const labelStyle = {
  fontSize: "0.75rem",
  color: "#6B6B6B",
  fontWeight: "500",
};

const selectStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #D0EAF5",
  borderRadius: "10px",
  backgroundColor: "#FFFFFF",
  color: "#2E2E2E",
  fontSize: "0.95rem",
  fontWeight: "500",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  textAlign: "center",
  textAlignLast: "center",
  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%236B6B6B' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left 10px center",
  backgroundSize: "12px",
};

export default SelectDate;
