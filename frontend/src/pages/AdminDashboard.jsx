import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import { Outlet } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
