import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ChangeStatusModal = ({ incident, onClose, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState(incident?.status || '');
  console.log(incident);
  
  useEffect(() => {
    if (incident) {
      setNewStatus(incident.status);
    }
  }, [incident]);

  const statuses = [
    'reported', 
    'under review', 
    'in progress', 
    'resolved', 
    'closed'
  ];

  const handleStatusChange = async () => {
    if (!incident || !incident.id) {
      toast.error("Incident data is missing!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/incidents/update-status`, {
        incidentId: incident.id,
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      toast.success("Incident status updated successfully!");
      onUpdateStatus(incident.id, newStatus);
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Change Incident Status</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">
          <div className="status-select-container">
            <label>Current Status: {incident?.status}</label>
            <select 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)}
              className="status-select"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button 
              onClick={handleStatusChange} 
              className="status-update-btn"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusModal;
