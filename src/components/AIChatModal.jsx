import React, { useState, useEffect } from "react";
import { X, Bot } from "lucide-react";

const AIChatModal = ({ onClose, analysisResult }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Fetching incident summary...", sender: "ai" },
  ]);

  useEffect(() => {
    if (analysisResult) {
      setMessages([{ id: 2, text: formatResponse(analysisResult), sender: "ai" }]);
    }
  }, [analysisResult]);

  const formatResponse = (response) => {
    return response
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\d\.\s/g, "<br/><strong>")
      .replace(/:/g, ":</strong>");
  };

  return (
    <div className="modal-overlay">
      <div className="ai-chat-modal">
        <div className="modal-header">
          <div className="chat-title">
            <Bot size={24} />
            <h2>Incident Summary Assistant</h2>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatModal;
