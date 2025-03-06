import React, { useState } from "react";
import Layout from "../components/Layout";
import "../assets/styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful");
      navigate("/redirect");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div id="login" className="card p-4" style={{ width: "400px" }}>
          <h2 className="card-title text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn w-100">
              Login
            </button>
          </form>
          <p className="text-left mt-3">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}