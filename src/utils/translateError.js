// src/utils/translateError.js
export const errorTranslations = {
  // --- Rate Limiting ---
  "You've reached the maximum amount of requests per minute. Please try again later.":
    "הגעת למקסימום בקשות אפשריות לדקה, נסה שוב מאוחר יותר.",

  // --- AUTH ---
  "Invalid credentials": "שם משתמש או סיסמה שגויים",
  "Username and password are required": "יש להזין שם משתמש וסיסמה",
  "User not found": "המשתמש לא נמצא",
  "Not authenticated": "יש להתחבר כדי להמשיך",
  "Refresh token is blacklisted.": "התחברות פגה תוקף, אנא התחבר מחדש",
  "No access token, need to refresh.": "אין גישה, יש לרענן התחברות",

  // NEW
  "Already logged out": "כבר נותקת מהמערכת",
  "No refresh token provided": "לא סופק אסימון רענון",

  // --- USERS ---
  "All fields are required": "נא למלא את כל השדות",
  "Invalid email format": "פורמט אימייל שגוי",
  "User already exists": "משתמש עם האימייל הזה כבר קיים",
  "Invalid role value": "ערך תפקיד לא חוקי",
  "Invalid gender value": "ערך מגדר לא חוקי",

  // --- SESSIONS ---
  "Session not found": "האימון לא נמצא",
  "Cannot register to a completed or cancelled session":
    "לא ניתן להירשם לאימון שהושלם או בוטל",
  "Already registered to this session": "כבר נרשמת לאימון הזה",
  "Session is full": "האימון מלא",
  "Invalid pagination parameters": "פרמטרים לא תקינים בעמודי הדפים",
  "Cannot unregister from a completed or cancelled session":
    "לא ניתן לבטל הרשמה מאימון שהושלם או בוטל",
  "User is not registered to this session": "המשתמש לא רשום לאימון הזה",
  "Session already cancelled": "האימון כבר בוטל",
  "Invalid user ID": "מזהה משתמש לא תקין",
  "User already registered to this session": "משתמש כבר רשום לאימון הזה",
  "Max participants must be greater than 0":
    "מספר המשתתפים המקסימלי חייב להיות גדול מ-0",
  "Duration must be greater than 0": "משך האימון חייב להיות גדול מ-0",
  "Invalid status": "סטטוס לא חוקי",
  "Cannot create a session in the past": "לא ניתן ליצור אימון בעבר",

  // NEW
  "Cannot update a cancelled or completed session":
    "לא ניתן לעדכן אימון שבוטל או הושלם",

  // --- By status ---
  400: "הבקשה לא תקינה",
  401: "אין הרשאה לבצע פעולה זו",
  403: "גישה אסורה",
  404: "המשאב לא נמצא",
  500: "שגיאה פנימית בשרת",

  // Default
  DEFAULT: "אירעה שגיאה, נסה שוב מאוחר יותר",
};

export const translateError = (error) => {
  if (!error?.response) {
    const customError = new Error(error.message || "אירעה שגיאה לא צפויה");
    customError.status = error.status || 500;
    return customError;
  }

  const message = error?.response?.data?.message;
  const status = error?.response?.status || 500;

  const translated =
    errorTranslations[message] ||
    errorTranslations[status] ||
    errorTranslations.DEFAULT;

  const customError = new Error(translated);
  customError.status = status;

  return customError;
};
