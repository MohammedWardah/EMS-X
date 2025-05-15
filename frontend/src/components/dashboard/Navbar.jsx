import React from "react";
import { useAuth } from "../../context/authContext.jsx";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className={styles.navbar}>
      <span>Hello, {user.name}</span>
      <button>Logout</button>
    </nav>
  );
};

export default Navbar;
