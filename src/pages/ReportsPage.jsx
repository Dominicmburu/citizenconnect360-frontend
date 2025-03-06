import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserLayout from '../components/UserLayout';
import Sidebar from '../components/Sidebar';
import '../assets/styles/ReportsPage.css';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch incidents from the backend
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incidents', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the JWT token
          },
        });
        setReports(response.data.incidents); 
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to fetch incidents. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <UserLayout>
      <div className="page-container">
        <Sidebar />
        <div className="page-content">
          <h1 className="page-title">Reports</h1>
          
          <div className="reports-list">
            {reports.map((report) => (
              <div key={report.id} className="report-item">
                <div className="report-details">
                  <div className={`report-status-badge ${report.status}`}>{report.status}</div>
                  <div className="report-info">
                    <div className="report-field">
                      <span className="field-label">Title</span>
                      <span className="field-value">{report.title}</span>
                    </div>
                    <div className="report-field">
                      <span className="field-label">Location</span>
                      <span className="field-value">{report.location}</span>
                    </div>
                    <div className="report-field">
                      <span className="field-label">Description</span>
                      <span className="field-value">{report.description}</span>
                    </div>
                  </div>
                </div>
                {report.mediaUrl && (
                  <div className="report-image">
                    {report.mediaUrl.endsWith(".mp4") ? (
                      <video controls width="100%">
                        <source src={`http://localhost:5000${report.mediaUrl}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={`http://localhost:5000${report.mediaUrl}`} alt="Report visual" />
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ReportsPage;