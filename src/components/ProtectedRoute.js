import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return children; // If the user is logged in, render the children (protected content)
};

export default ProtectedRoute;
