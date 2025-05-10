import React from "react";
import { addComponentToDate } from "../../../utils/homeUtils";

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

  return (
    <div style={{ display: "flex", gap: "1rem", direction: "rtl" }}>
      {/* Day*/}
      <select value={selectedDate.split("-")[2]} onChange={handleChange("day")}>
        <option value="">יום</option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      {/* Month */}
      <select
        value={selectedDate.split("-")[1]}
        onChange={handleChange("month")}
      >
        <option value="">חודש</option>
        {months.map((month, i) => (
          <option key={month} value={month}>
            {i + 1}
          </option>
        ))}
      </select>

      {/* Year */}
      <select
        value={selectedDate.split("-")[0]}
        onChange={handleChange("year")}
      >
        <option value="">שנה</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDate;
