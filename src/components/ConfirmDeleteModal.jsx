import React from 'react';
import { X, Trash2 } from 'lucide-react';

const ConfirmDeleteModal = ({ poll, onClose, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="confirm-delete-modal">
        <div className="modal-header">
          <h2>Confirm Delete</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="modal-content delete-content">
          <Trash2 size={48} color="red" />
          <p>Are you sure you want to delete this poll?</p>
          <div className="delete-poll-details">
            <span>Question: {poll.question}</span>
            <span>Participants: {poll.numParticipants}</span>
          </div>
          <div className="modal-actions delete-actions">
            <button 
              onClick={onClose} 
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              onClick={onDelete} 
              className="confirm-delete-btn"
            >
              Delete Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;