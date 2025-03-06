import React from 'react';
import { X } from 'lucide-react';

const FeedbackDetailsModal = ({ topic, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="feedback-details-modal">
        <div className="modal-header">
          <h2>Feedback Details</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">
          <div className="topic-info">
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </div>

          <div className="feedbacks-list">
            <h4>Submitted Feedbacks ({topic.feedbacks.length})</h4>
            {topic.feedbacks.length === 0 ? (
              <p>No feedbacks submitted yet.</p>
            ) : (
              topic.feedbacks.map((feedback) => (
                <div key={feedback.id} className="feedback-item">
                  <p>{feedback.message}</p>
                  <span className="feedback-metadata">
                    User ID: {feedback.userId}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailsModal;