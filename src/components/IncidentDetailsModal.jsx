import React from 'react';
import { X } from 'lucide-react';

const IncidentDetailsModal = ({ incident, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Incident Details</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">
          <div className="incident-detail-row">
            <span className="detail-label">Title:</span>
            <span className="detail-value">{incident.title}</span>
          </div>
          <div className="incident-detail-row">
            <span className="detail-label">Description:</span>
            <span className="detail-value">{incident.description}</span>
          </div>
          <div className="incident-detail-row">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{incident.location}</span>
          </div>
          <div className="incident-detail-row">
            <span className="detail-label">Status:</span>
            <span className="detail-value">{incident.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailsModal;