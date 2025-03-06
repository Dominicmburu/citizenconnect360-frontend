import React, { useEffect, useRef } from 'react';
import { X, Bot } from 'lucide-react';

const AISummaryModal = ({ topic, onClose }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [topic]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="modal-overlay">
      <div className="ai-summary-modal">
        <div className="modal-header">
          <div className="chat-title">
            <Bot size={24} />
            <h2>AI Summary</h2>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="chat-messages">
          <div className="chat-message ai">
            {topic.aiSummary ? topic.aiSummary : `No AI insights available for "${topic.title}".`}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default AISummaryModal;
