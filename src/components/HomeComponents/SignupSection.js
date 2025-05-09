import React, { useState } from "react";
import Calendar from "react-calendar";

const lessons = [
  "שיעור אישי",
  "יוגה",
  "פילאטיס",
  "מיינדפולנס",
  "מתרגלת מדיטציות",
  "מיינדפולנס למטפלים",
];

const SignupSection = () => {
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);

  const getAvailableHours = (date) => {
    const day = date.getDay();
    if (day === 5) {
      return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
    } else if (day >= 0 && day <= 4) {
      return [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ];
    } else {
      return [];
    }
  };

  const isAlreadyBooked = (date, time) => {
    return registrations.some(
      (r) => r.date === date.toLocaleDateString() && r.time === time
    );
  };

  const handleBooking = () => {
    if (selectedLesson && selectedDate && selectedTime) {
      if (isAlreadyBooked(selectedDate, selectedTime)) {
        alert("כבר יש רישום בשעה הזאת!");
        return;
      }

      const newRegistration = {
        lesson: selectedLesson,
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
      };

      setRegistrations((prev) => [...prev, newRegistration]);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
        setSelectedLesson("");
        setSelectedDate(null);
        setSelectedTime("");
      }, 7000);
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        backgroundColor: "#fef7ec",
        padding: "3rem 2rem",
        borderRadius: 20,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "3rem", marginBottom: "2rem", color: "#222" }}>
        השיעורים שלי
      </h2>

      <select
        value={selectedLesson}
        onChange={(e) => setSelectedLesson(e.target.value)}
        style={{
          padding: "0.7rem 1.2rem",
          border: "2px solid #ddd",
          borderRadius: 10,
          fontSize: "1.2rem",
          backgroundColor: "#fff",
          marginBottom: "2rem",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
        }}
      >
        <option value="">בחר סוג שיעור</option>
        {lessons.map((lesson) => (
          <option key={lesson} value={lesson}>
            {lesson}
          </option>
        ))}
      </select>

      {selectedLesson && (
        <div>
          <Calendar onChange={setSelectedDate} value={selectedDate} />

          {selectedDate && (
            <>
              <h3>בחר שעה</h3>
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {getAvailableHours(selectedDate).map((hour) => (
                  <button
                    key={hour}
                    style={{
                      padding: "0.8rem 1.4rem",
                      backgroundColor:
                        selectedTime === hour ? "#6ccf9c" : "#f8f8f8",
                      color: selectedTime === hour ? "white" : "black",
                      border: `2px solid ${
                        selectedTime === hour ? "#6ccf9c" : "#ddd"
                      }`,
                      borderRadius: 8,
                      fontSize: "1rem",
                      cursor: isAlreadyBooked(selectedDate, hour)
                        ? "not-allowed"
                        : "pointer",
                    }}
                    disabled={isAlreadyBooked(selectedDate, hour)}
                    onClick={() => setSelectedTime(hour)}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedTime && (
            <>
              {!successMessage ? (
                <button
                  onClick={handleBooking}
                  style={{
                    marginTop: "2rem",
                    padding: "1rem 2rem",
                    fontSize: "1.2rem",
                    backgroundColor: "#6ccf9c",
                    border: "none",
                    borderRadius: 12,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  אשר הרשמה
                </button>
              ) : (
                <div
                  style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: 12,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginTop: 20,
                    transition: "opacity 0.5s",
                  }}
                >
                  ✅ איזה כיף! נרשמת בהצלחה
                </div>
              )}
            </>
          )}
        </div>
      )}

      {registrations.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>רישומים קיימים</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {registrations.map((reg, index) => (
              <li key={index} style={{ marginTop: "0.5rem" }}>
                {reg.lesson} - {reg.date} בשעה {reg.time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignupSection;
