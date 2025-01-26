import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLayout from "../admin/AdminLayout";
import { Spinner } from "react-bootstrap";

const AdminProtectedRoute = () => {
  const { isRejected, user, isAuthenticated, isLoading, isSuccess } =
    useSelector((state) => state.user);

  return <AdminLayout />;
  // return user?.role === "admin" ? (
  //   <AdminLayout />
  // ) : user?.role === "user" ? (
  //   <Navigate to="/unauthorized" />
  // ) : isRejected && user === null ? (
  //   <h2>You are not user, please login</h2>
  // ) : (
  //   // <Spinner />
  //   ""
  // );
};

export default AdminProtectedRoute;
