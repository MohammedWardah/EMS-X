import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminSidebar.module.css";
// Icons
import { FaUsers } from "react-icons/fa";
import { MdOutlineDashboard, MdBusiness } from "react-icons/md";
import { LiaCogSolid, LiaMoneyCheckAltSolid } from "react-icons/lia";
import { IoMdExit } from "react-icons/io";
import logo from "../../assets/images/logo.png";

const AdminSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>
        <img src={logo} alt="Logo" />
        <h3>EMS-X</h3>
      </div>
      <div className={styles.navLinks}>
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) => (isActive ? styles.active : "")}
          end
        >
          <MdOutlineDashboard />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <MdBusiness />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leave"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <IoMdExit />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <LiaMoneyCheckAltSolid />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/settings"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <LiaCogSolid />
          <span>Settings</span>
        </NavLink>
        <button className={styles.logout}>Logout</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
