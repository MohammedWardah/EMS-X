import React from "react";
import { useAuth } from "../../context/authContext.jsx";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className={styles.navbar}>
      <span>{user.name}</span>
    </nav>
  );
};

export default Navbar;
