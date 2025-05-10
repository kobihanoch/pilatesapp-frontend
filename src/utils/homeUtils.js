export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
