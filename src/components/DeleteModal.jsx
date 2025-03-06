import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ConfirmDeleteModal = ({ incident, onClose, onDelete }) => {
  console.log(incident);
  
  const handleDelete = async () => {
    if (incident && incident.id) {
      try {
        await onDelete(incident.id);
        toast.success("Incident deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete the incident!");
      }
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        <div className="modal-header">
          <h2>Confirm Delete</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="modal-content delete-content">
          <Trash2 size={48} color="red" />
          <p>Are you sure you want to delete this incident?</p>
          {incident && (
            <div className="delete-warning">
              <span>Incident: {incident.title}</span>
              <span>Location: {incident.location}</span>
            </div>
          )}
          <div className="modal-actions delete-actions">
            <button 
              onClick={onClose} 
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              onClick={handleDelete} 
              className="confirm-delete-btn"
            >
              Delete Incident
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
