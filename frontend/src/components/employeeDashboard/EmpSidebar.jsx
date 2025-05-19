import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../dashboard/AdminSidebar.module.css";
import { useAuth } from "../../context/authContext";
// Icons
import { FaUsers } from "react-icons/fa";
import { MdOutlineDashboard, MdBusiness } from "react-icons/md";
import { LiaCogSolid, LiaMoneyCheckAltSolid } from "react-icons/lia";
import { IoMdExit } from "react-icons/io";
import logo from "../../assets/images/logo.png";

const EmpSidebar = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>
        <img src={logo} alt="Logo" />
        <h3>EMS-X</h3>
      </div>
      <div className={styles.navLinks}>
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) => (isActive ? styles.active : "")}
          end
        >
          <MdOutlineDashboard />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <FaUsers />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/leave"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <IoMdExit />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <LiaMoneyCheckAltSolid />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/settings"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <LiaCogSolid />
          <span>Settings</span>
        </NavLink>
        <button className={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default EmpSidebar;
