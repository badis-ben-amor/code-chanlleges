import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
