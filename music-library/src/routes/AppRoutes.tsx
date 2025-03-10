import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MusicLibrary from "../components/MusicLibrary/MusicLibrary";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private Routes */}
      <Route
        path="/music"
        element={
          <PrivateRoute>
            <MusicLibrary />
          </PrivateRoute>
        }
      />

      {/* Redirect unknown routes to Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
