import React, { useState } from "react";
import API from "../Api/axios";

const Register = ({ setPage }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/users/register",
        form
      );

      alert(
        "Registration Successful"
      );

      setPage("login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={register}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="btn">Register</button>
      </form>

      <p>
        Already Registered?
        <button className="btn ghost" onClick={() => setPage("login")}>Login</button>
      </p>
    </div>
  );
};

export default Register;