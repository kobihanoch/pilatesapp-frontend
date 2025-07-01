export const validateLogin = (username, password) => {
  if (!username || !password) {
    throw new Error("חובה למלא שם משתמש וסיסמה");
  }
};
