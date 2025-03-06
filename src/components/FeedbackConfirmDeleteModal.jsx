import React from 'react';
import { X, Trash2 } from 'lucide-react';

const ConfirmDeleteModal = ({ item, onClose, onConfirmDelete, itemType }) => {
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
          <p>Are you sure you want to delete this {itemType}?</p>
          <div className="delete-item-details">
            <span>Title: {item.title}</span>
            {itemType === 'topic' && (
              <span>Feedbacks: {item.feedbacks.length}</span>
            )}
          </div>
          <div className="modal-actions delete-actions">
            <button 
              onClick={onClose} 
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirmDelete} 
              className="confirm-delete-btn"
            >
              Delete {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;