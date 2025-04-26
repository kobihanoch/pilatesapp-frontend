import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Authenticated/Home.js";
import Loginandregister from "./pages/Guests/Loginandregister.js";
import Intro from "./pages/Guests/Intro.js";
import { useAuthContext } from "./context/authContext.js";

// Route for authenticated users
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/" replace />;
};

// Route for guests (not authenticated users)
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  return !user ? children : <Navigate to="/home" replace />;
};

function App() {
  return (
    // Define the routes for the application.
    // We are protecting the routes using PrivateRoute and GuestRoute components
    // If a user is authenticated, they will be redirected to the home page if they try to access the login/register page
    // If a user is not authenticated, they will be redirected to the login/register page if they try to access the home page
    <Routes>
      {/* For guests */}
      <Route
        path="/"
        element={
          <GuestRoute>
            <Intro />
          </GuestRoute>
        }
      />
      <Route
        path="/intro/auth"
        element={
          <GuestRoute>
            <Loginandregister />
          </GuestRoute>
        }
      />

      {/* For authenticated users */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
