import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleBasedRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      switch (userRole) {
        case "ADMIN" || "OFFICIAL":
          navigate("/admin");
          break;
        case "CITIZEN":
          navigate("/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login"); 
    }
  }, [navigate]);

  return null;
};

export default RoleBasedRedirect;