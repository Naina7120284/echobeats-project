import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { UserData } from "../context/User";

const ProtectedRoute = () => {
  const { isAuth, loading } = UserData();

  // Wait for the fetchUser() in your useEffect to finish
  if (loading) {
     return <div className="h-screen flex items-center justify-center">Loading...</div>; 
  }

  // If not logged in, redirect to landing page or login
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;