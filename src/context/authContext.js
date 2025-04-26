import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On load -----------------------------------------------
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    // Navigating automatically to the home page if user is logged in
  }, []);

  // Utils -----------------------------------------------

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      const { user } = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const logout = async () => {
    try {
      logoutUser(user.token);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        auth: {
          login,
          logout,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
