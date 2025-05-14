import React from "react";
import { useAuth } from "../../context/authContext.jsx";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className={styles.navbar}>
      <span>Hello, {user.name}</span>
      <button>Logout</button>
    </div>
  );
};

export default Navbar;
