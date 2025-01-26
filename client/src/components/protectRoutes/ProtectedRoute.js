import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);

  return isAuthenticated ? children : children;
  // return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectRoute;
