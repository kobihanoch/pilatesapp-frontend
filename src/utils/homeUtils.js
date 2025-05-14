export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export const addComponentToDate = (date, compName, newVal) => {
  const splitedDate = date.split("-");
  if (compName === "day") {
    splitedDate[2] = newVal;
  } else if (compName === "month") {
    splitedDate[1] = newVal;
  } else if (compName === "year") {
    splitedDate[0] = newVal;
  } else return date;
  return splitedDate.join("-");
};

export const getDayName = (dateStr) => {
  try {
    const date = new Date(dateStr);
    const days = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"];
    return "יום " + days[date.getDay()];
  } catch {
    return "";
  }
};
