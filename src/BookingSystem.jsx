import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingSystem.css";

const lessons = [
  "שיעור אישי",
  "יוגה",
  "פילאטיס",
  "מיינדפולנס",
  "מתרגלת מדיטציות",
  "מיינדפולנס למטפלים",
];

const LessonBooking = () => {
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);

  const getAvailableHours = (date) => {
    const day = date.getDay();
    if (day === 5) {
      // Friday
      return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
    } else if (day >= 0 && day <= 4) {
      // Sunday-Thursday
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
      return []; // Saturday closed
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

      // לאחר 7 שניות - להחזיר כפתור
      setTimeout(() => {
        setSuccessMessage(false);
        setSelectedLesson("");
        setSelectedDate(null);
        setSelectedTime("");
      }, 7000);
    }
  };

  return (
    <div className="booking-system">
      <h2>השיעורים שלי</h2>

      <select
        value={selectedLesson}
        onChange={(e) => setSelectedLesson(e.target.value)}
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
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="react-calendar"
          />

          {selectedDate && (
            <>
              <h3>בחר שעה</h3>
              <div className="time-picker">
                {getAvailableHours(selectedDate).map((hour) => (
                  <button
                    key={hour}
                    className={selectedTime === hour ? "selected" : ""}
                    disabled={isAlreadyBooked(selectedDate, hour)}
                    onClick={() => setSelectedTime(hour)}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* כפתור הרשמה או הודעה בהתאם */}
          {selectedTime && (
            <>
              {!successMessage ? (
                <button onClick={handleBooking} className="confirm-button">
                  אשר הרשמה
                </button>
              ) : (
                <div className="success-message">✅ איזה כיף! נרשמת בהצלחה</div>
              )}
            </>
          )}
        </div>
      )}

      {registrations.length > 0 && (
        <div className="registrations-list">
          <h3>רישומים קיימים</h3>
          <ul>
            {registrations.map((reg, index) => (
              <li key={index}>
                {reg.lesson} - {reg.date} בשעה {reg.time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LessonBooking;
