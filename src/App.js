import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Authenticated/Home.js";
import Loginandregister from "./pages/Guests/Loginandregister.js";
import Intro from "./pages/Guests/Intro.js";
import { useAuthContext } from "./context/authContext.js";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/intro" replace />;
};

const GuestRoute = ({ children }) => {
  const { user } = useAuthContext();
  return !user ? children : <Navigate to="/home" replace />;
};

function App() {
  return (
    <Routes>
      {/* For guests */}
      <Route
        path="/intro"
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
