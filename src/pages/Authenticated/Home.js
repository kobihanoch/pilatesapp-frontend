import React from "react";
import { useAuthContext } from "../../context/authContext";
import { fetchAuthenticatedUser } from "../../services/userService";

const Home = () => {
  const { setUser, auth } = useAuthContext();

  const handleFetchUserData = async () => {
    try {
      const data = await fetchAuthenticatedUser();
      console.log("User Data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null); // Clear user data on error
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={auth.logout}>Logout</button>
      <button onClick={handleFetchUserData}>Fetch User Data</button>
    </div>
  );
};

export default Home;
