import React, { useState, useEffect } from 'react';
import '../assets/styles/adminDash.css';
import AdminSidebar from '../components/AdminSidebar';
import AdminLayout from '../components/AdminLayout';
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState([
    { label: "Incidents", count: 0, percentage: "0%" },
    { label: "Polls", count: 0, percentage: "0%" },
    { label: "Users", count: 0, percentage: "0%" },
    { label: "Topics", count: 0, percentage: "0%" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No authentication token found!");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [incidentsRes, pollsRes, usersRes, topicsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/incidents", { headers }),
          axios.get("http://localhost:5000/api/polls", { headers }),
          axios.get("http://localhost:5000/api/admin/users", { headers }),
          axios.get("http://localhost:5000/api/feedback/topics", { headers }),
        ]);

        setDashboardStats([
          { label: "Incidents", count: incidentsRes.data.incidents.length, percentage: "2% ↑" },
          { label: "Polls", count: pollsRes.data.polls.length, percentage: "2% ↑" },
          { label: "Users", count: usersRes.data.length, percentage: "2% ↑" },
          { label: "Topics", count: topicsRes.data.topics.length, percentage: "2% ↑" },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
    <div className="admin-container">
      <AdminSidebar/>
      <div className="main-content">        
        <div className="dashboard-content">
          <div className="dashboard-stats">
            {dashboardStats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-count">{stat.count}</div>
                <div className="stat-percentage">{stat.percentage}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="dashboard-grid">
          <div className="grid-item">
                <h3>Latest Incidents</h3>
                <ul>
                  {dashboardStats[0].count > 0 ? (
                    dashboardStats[0].count > 5 ? (
                      <li>Too many incidents to display...</li>
                    ) : (
                      <li>Recent incidents available</li>
                    )
                  ) : (
                    <li>No incidents reported</li>
                  )}
                </ul>
              </div>
              <div className="grid-item">
                <h3>Recent Polls</h3>
                <p>{dashboardStats[1].count > 0 ? `${dashboardStats[1].count} Active Polls` : "No active polls"}</p>
              </div>
              <div className="grid-item map-item">
                <h3>Incident Map</h3>
                {/* <p>Map integration goes here</p> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;