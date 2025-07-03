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
  const thisWeek = getISOWeek(new Date());
  const thisYear = getYear(new Date());

  // Filter sessions to only include those from the current week
  let filteredSessions = sessions.filter((s) => {
    const sessionWeek = getISOWeek(new Date(s.date));
    const sessionYear = getYear(new Date(s.date));
    return sessionWeek === thisWeek && sessionYear === thisYear;
  });

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
