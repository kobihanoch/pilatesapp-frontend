import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../services/authService";
import { fetchAuthenticatedUser } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // On load -----------------------------------------------
  // Check if user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await fetchAuthenticatedUser();
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    // Navigating automatically to the home page if user is logged in
  }, []);

  // Utils -----------------------------------------------

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await loginUser(username, password);
      const { user } = response;
      setUser(user);
      console.log("User logged in:", user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const register = async (user) => {
    setLoading(true);
    try {
      const response = await registerUser(user);
      console.log("User registered:", response.user);
      await login(response.user.username, user.password); // Automatically log in after registration
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Rethrow the error to handle it in the component
    } finally {
      setLoading(false);
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
        register,
        loading,
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
