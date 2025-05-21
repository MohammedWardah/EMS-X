import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import { useAuth } from "../context/authContext.jsx";

import logo from "../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Unexpected server error occurred");
      }
    }
  };

  return (
    <>
      <main className={styles.login}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1>EMS-X</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Login to EMS-X</h2>
          {error && <p className={styles.error}>{error}</p>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="example@domain.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button>Login</button>
        </form>
      </main>
      <footer>
        <div className={styles.footer}>
          <p>© 2025 EMS-X All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Login;
