import React from "react";
import { useAuthContext } from "../../context/authContext.js";

const Loginandregister = () => {
  const { auth, loading, register } = useAuthContext();

  const handleLogin = async () => {
    try {
      await auth.login("username", "password");
      console.log("Login successful!");
    } catch (error) {
      alert(error);
    }
  };

  const handleRegister = async () => {
    try {
      const newUser = {
        username: "newuser",
        password: "newpassword",
        email: "newuser@example.com",
        birthDate: "2000-01-01",
        gender: "male",
      };

      await register(newUser);
    } catch (error) {
      alert(error);
    }
  };

  if (loading) {
    // Create here a placeholder for loading
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Login and Register</h1>
    </div>
  );
};

export default Loginandregister;
