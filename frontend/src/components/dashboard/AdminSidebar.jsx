import { NavLink } from "react-router-dom";
import styles from "./AdminSidebar.module.css";
import { useAuth } from "../../context/authContext.jsx";
// Icons
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { MdOutlineDashboard, MdBusiness } from "react-icons/md";
import { LiaCogSolid, LiaMoneyCheckAltSolid } from "react-icons/lia";
import { IoMdExit } from "react-icons/io";
import logo from "../../assets/images/logo.png";

const AdminSidebar = () => {
  const { logout } = useAuth();
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
          to="/admin-dashboard/leave-requests"
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
          <span>Payroll</span>
        </NavLink>
        <NavLink
          to={`/admin-dashboard/attendance`}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <FaNewspaper />
          <span>Attendance</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/settings"
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

export default AdminSidebar;
