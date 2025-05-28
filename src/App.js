import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Authenticated/Home.js";
import Loginandregister from "./pages/Guests/Loginandregister.js";
import Intro from "./pages/Guests/Intro.js";
import { useAuthContext } from "./context/authContext.js";
import LoadingSpinner from "./components/Loading/LoadingSpinner.js";
import "./index.css";
import AdminDashboard from "./pages/Admins/AdminDashboard.js";
import TopBar from "./components/HomeComponents/TopBar.js";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout.js";
import { ToastContainer } from "react-toastify";

// Route for authenticated users
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <LoadingSpinner text="מתחבר..."></LoadingSpinner>;
  }
  return user ? children : <Navigate to="/" replace />;
};

// Route for admins
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <LoadingSpinner text="מתחבר למצב ניהול..."></LoadingSpinner>;
  }
  return user ? (
    user?.role === "admin" ? (
      children
    ) : (
      <Navigate to="/home" replace /> // Home page
    )
  ) : (
    <Navigate to="/" replace />
  );
};

// Route for guests (not authenticated users)
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <LoadingSpinner text="טוען..."></LoadingSpinner>;
  }
  return !user ? children : <Navigate to="/home" replace />;
};

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/*
      //Define the routes for the application.
       // We are protecting the routes
      using PrivateRoute and GuestRoute components 
      // If a user is
      authenticated, they will be redirected to the home page if they try to
      access the login/register page 
      // If a user is not authenticated, they
      will be redirected to the login/register page if they try to access the
      home page
      */}
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

        {/* For admins users */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <AuthenticatedLayout>
                <AdminDashboard />
              </AuthenticatedLayout>
            </AdminRoute>
          }
        />

        {/* For authenticated users */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Home />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
