// routes.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import WeatherApp from "../Pages/WeatherApp.js";
import UsersApp from "../Pages/UserApp.js";
import Login from "../Pages/Login.js";
import Signup from "../Pages/Signup.js";
import UserProfile from "../Pages/UserProfile.js";

function AppRoutes({ isLoggedIn }) {
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <WeatherApp /> : <Navigate to="/login" />}
      />
      <Route
        path="/users"
        element={isLoggedIn ? <UsersApp /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/profile"
        element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />}
      />
      <Route
        path="/*"
        element={isLoggedIn ? <WeatherApp /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default AppRoutes;
