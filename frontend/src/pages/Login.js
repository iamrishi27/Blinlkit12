import React, { useState } from "react";
import API from "../Api/axios";

const Login = ({ setToken, setPage, setRole }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/users/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);

      setToken(res.data.token);
      setRole(res.data.role);

      alert("Login Successful");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={login}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Login
        </button>
      </form>

      <p>
        Don't have an account?
        <button className="btn ghost" onClick={() => setPage("register")}>Register</button>
      </p>
    </div>
  );
};

export default Login;