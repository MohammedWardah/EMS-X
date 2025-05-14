import React from "react";
import { useAuth } from "../context/authContext.jsx";
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
// import styles from "./AdminDashboard.module.css";
import AdminSummary from "../components/dashboard/AdminSummary.jsx";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <AdminSidebar />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
