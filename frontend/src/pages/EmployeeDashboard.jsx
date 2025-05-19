import React from "react";
import EmpSidebar from "../components/employeeDashboard/EmpSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import styles from "../pages/AdminDashboard.module.css";

const EmployeeDashboard = () => {
  return (
    <div className={styles.adminLayout}>
      <EmpSidebar />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default EmployeeDashboard;
