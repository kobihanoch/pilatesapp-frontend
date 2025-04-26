import React from "react";
import { useAuthContext } from "../../context/authContext";

const Home = () => {
  const { auth } = useAuthContext();
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
};

export default Home;
