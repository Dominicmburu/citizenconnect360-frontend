import React, { useState, useEffect } from "react";
import "../assets/styles/incident.css";
import AdminLayout from "../components/AdminLayout";
import AdminSidebar from "../components/AdminSidebar";
import IncidentDetailsModal from "../components/IncidentDetailsModal";
import ChangeStatusModal from "../components/ChangeStatusModal";
import ConfirmDeleteModal from "../components/DeleteModal";
import AIChatModal from "../components/AIChatModal";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/incidents";
const AI_ANALYSIS_URL = "http://localhost:8080/analyze-incidents";

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setIncidents(response.data.incidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const handleViewIncident = (incident) => {
    setSelectedIncident(incident);
    setIsDetailsModalOpen(true);
  };

  const handleChangeStatus = (incident) => {
    setSelectedIncident(incident);
    setIsStatusModalOpen(true);
  };

  const handleDeleteIncident = async (incidentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/delete/${incidentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== incidentId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };

  const handleUpdateStatus = async (incidentId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Error: No token found in localStorage.");
        return;
      }

      const response = await axios.patch(
        `${API_BASE_URL}/update-status`,
        { incidentId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status update response:", response.data);

      setIncidents(
        incidents.map((incident) =>
          incident.id === incidentId
            ? { ...incident, status: newStatus }
            : incident
        )
      );
      setIsStatusModalOpen(false);
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleGetAnalysis = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(AI_ANALYSIS_URL, { incidents });
      setAnalysisResult(response.data.insights);
      setIsChatModalOpen(true);
    } catch (error) {
      console.error("Error fetching AI insights:", error);
      setAnalysisResult("Error generating analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (response) => {
    return response
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\d\.\s/g, "<br/><strong>")
      .replace(/:/g, ":</strong>");
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        <AdminSidebar />
        <div className="incident-content">
          <div className="incident-management-content">
            <div className="get-summary-section">
              <button 
              className="get-summary-btn" 
              onClick={handleGetAnalysis}
              disabled={isLoading}
              >
                {isLoading ? "Generating Summary..." : "Get Summary"}
              </button>
            </div>

            <div className="incidents-list">
              {incidents.map((incident) => (
                <div key={incident.id} className="incident-row">
                  <div className="incident-details">
                    <span>{incident.title}</span>
                    <span>{incident.location}</span>
                    <span>{incident.status}</span>
                  </div>
                  <div className="incident-actions">
                    <button onClick={() => handleViewIncident(incident)}>
                      View
                    </button>
                    <button onClick={() => handleChangeStatus(incident)}>
                      Change Status
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIncident(incident);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isDetailsModalOpen && (
              <IncidentDetailsModal
                incident={selectedIncident}
                onClose={() => setIsDetailsModalOpen(false)}
              />
            )}

            {isStatusModalOpen && (
              <ChangeStatusModal
                incident={selectedIncident}
                onClose={() => setIsStatusModalOpen(false)}
                onUpdateStatus={handleUpdateStatus}
              />
            )}

            {isDeleteModalOpen && (
              <ConfirmDeleteModal
                incident={selectedIncident}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteIncident}
              />
            )}

            {isChatModalOpen && (
              <AIChatModal
                onClose={() => setIsChatModalOpen(false)}
                analysisResult={analysisResult}
              />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default IncidentManagement;
