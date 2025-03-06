import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateTopicModal = ({ onClose, onCreateTopic }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newTopic = {
      title,
      description
    };

    onCreateTopic(newTopic);
  };

  return (
    <div className="modal-overlay">
      <div className="create-topic-modal">
        <div className="modal-header">
          <h2>Create New Feedback Topic</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">
          <div className="topic-input-group">
            <label>Topic Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter topic title"
            />
          </div>

          <div className="topic-input-group">
            <label>Topic Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the topic"
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button 
              onClick={handleSubmit}
              className="create-topic-btn"
            >
              Create Topic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTopicModal;