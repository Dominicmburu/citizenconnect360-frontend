import React, { useState } from "react";
import Layout from "../components/Layout";
import "../assets/styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
      toast.error("Username is required");
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return false;
    }

    if (!email) {
      toast.error("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Confirm Password is required");
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div id="login" className="card p-4" style={{ width: "400px" }}>
          <h2 className="card-title text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn w-100">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-primary">
              Login
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
