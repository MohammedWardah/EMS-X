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
          to="/admin-dashboard/employees"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <MdBusiness />
          <span>Department</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <IoMdExit />
          <span>Leave</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <LiaMoneyCheckAltSolid />
          <span>Salary</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <LiaCogSolid />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
