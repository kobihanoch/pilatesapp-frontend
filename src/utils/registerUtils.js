export const validateRegister = (
  username,
  password,
  confirmPassword,
  email,
  birthDate,
  gender,
  fullName
) => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fullNameRegex = /^[א-תa-zA-Z\s]+$/;

  if (
    !username ||
    !password ||
    !confirmPassword ||
    !email ||
    !birthDate ||
    !gender ||
    !fullName
  ) {
    throw new Error("חובה למלא את כל השדות");
  }

  if (!usernameRegex.test(username)) {
    throw new Error("שם המשתמש חייב להיות באנגלית בלבד");
  }

  if (!emailRegex.test(email)) {
    throw new Error("אימייל לא חוקי");
  }

  if (!fullNameRegex.test(fullName)) {
    throw new Error("שם מלא חייב להכיל רק אותיות ורווחים");
  }

  if (password !== confirmPassword) {
    throw new Error("הסיסמאות אינן תואמות");
  }

  if (password.length < 6) {
    throw new Error("הסיסמה חייבת להכיל לפחות 6 תווים");
  }
};
