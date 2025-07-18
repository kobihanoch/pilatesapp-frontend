import isEqual from "lodash.isequal";
import pick from "lodash.pick";

// Returns false if a session changed
export const hasSessionChanged = (session, form) => {
  const fields = [
    "date",
    "time",
    "duration",
    "type",
    "status",
    "location",
    "notes",
    "maxParticipants",
  ];

  // Returns only specific properties from an object
  const normalize = (obj) => {
    return {
      ...pick(obj, fields),
      date: obj.date ? obj.date.split("T")[0] : "",
    };
  };
  return !isEqual(normalize(session), normalize(form));
};

// Returns false if a session changed
export const hasUserChanged = (user, form) => {
  const fields = [
    "username",
    "fullName",
    "email",
    "birthDate",
    "gender",
    "role",
  ];

  // Returns only specific properties from an object
  const normalize = (obj) => {
    return {
      ...pick(obj, fields),
      birthDate: obj.birthDate ? obj.birthDate.split("T")[0] : "",
    };
  };
  return !isEqual(normalize(user), normalize(form));
};
