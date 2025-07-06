import { getISOWeek, getYear } from "date-fns";

export const validateForm = (formData) => {
  for (const key in formData) {
    if (
      formData[key] === undefined ||
      formData[key] === null ||
      formData[key] === ""
    ) {
      return false; // Form is invalid
    }
  }
  return true; // Form is valid
};

export const filterRegisteredSessionToThisWeekSessions = (sessions) => {
  console.log("All upcoming: ", sessions);

  // Get today's dat
  const today = new Date();
  // Set sunday from 00:00:00:00
  const thisWeekSundayMorning = new Date(); // Returns sunday (0)
  thisWeekSundayMorning.setDate(today.getDate() - today.getDay()); // Returns sunday (0)
  thisWeekSundayMorning.setHours(0, 0, 0, 0);

  console.log("Sunday: ", thisWeekSundayMorning);

  // Set saturday until 23:59:59:999
  const thisWeekSaturdayNight = new Date();
  thisWeekSaturdayNight.setDate(thisWeekSundayMorning.getDate() + 6);
  thisWeekSaturdayNight.setHours(23, 59, 59, 999);

  console.log("Saturday: ", thisWeekSaturdayNight);

  // Filter sessions to only include those from the current week
  let filteredSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.date);
    return (
      sessionDate >= thisWeekSundayMorning &&
      sessionDate <= thisWeekSaturdayNight
    );
  });

  // Filter only cancled sessions
  let cancledCount = filteredSessions.filter((s) => s.status === "בוטל").length;

  // Sort from sooner to latest
  filteredSessions = filteredSessions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return {
    upcomingSessions: filteredSessions,
    cancledSessionsCount: cancledCount,
  };
};
