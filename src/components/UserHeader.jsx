import React from 'react';
import '../assets/styles/userheader.css';
import { FaUser, FaBell, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UserHeader = () => {
  const username = "Dominic";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token"); // Remove token
      toast.success("Logged out successfully!");
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  
  return (
    <header id='header' className="header">
      <div className="header-left">
        <button className="menu-button">
          <FaBars />
        </button>
        <h1 className="welcome-text">Welcome, {username}</h1>
      </div>
      <div className="header-right">
        <div className="user-icons">
          <FaUser />
        </div>
        <div className="notification-icon">
          <FaBell />
        </div>
        <div className="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <FaSignOutAlt />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;