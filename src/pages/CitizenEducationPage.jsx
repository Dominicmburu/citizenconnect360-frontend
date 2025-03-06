import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import UserLayout from '../components/UserLayout';
import Sidebar from '../components/Sidebar';
import '../assets/styles/CitizenEducationPage.css';

const API_BASE_URL = 'http://127.0.0.1:8080';

const CitizenEducationPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const documents = [
    {
      id: 1,
      title: 'CitizenConnect design document',
      description: 'This document contains the design of the Citizen Connect system.',
      fileUrl: 'http://localhost:5000/uploads/doc/CitizenConnect360.pdf',
    },
    {
      id: 2,
      title: 'Constitution of Kenya',
      description: 'The official Constitution of Kenya.',
      fileUrl: 'http://localhost:5000/uploads/doc/Constitution_of_Kenya_2010_with_table_of_content.pdf',
    },
    {
      id: 3,
      title: 'Treasury Bonds',
      description: 'An overview of treasury bonds and their impact on the economy.',
      fileUrl: 'http://localhost:5000/uploads/doc/Treasury-Bonds-Brochure_.pdf',
    },
    {
      id: 4,
      title: 'FAQs - GOK Securities',
      description: 'Frequently Asked Questions about Government of Kenya Securities.',
      fileUrl: 'http://localhost:5000/uploads/doc/FAQsGoKSecurities.pdf',
    },
  ];

  const handleChatOpen = async (doc) => {
    setCurrentDoc(doc);
    setShowChat(true);
    setChatMessages([{ text: 'Fetching summary...', sender: 'bot' }]);

    try {
      const response = await axios.post(`${API_BASE_URL}/summarize`, { pdf_url: doc.fileUrl });
      setChatMessages([{ text: response.data.summary, sender: 'bot' }]);
      setCurrentDoc({ ...doc, fileId: response.data.file_id });
    } catch (error) {
      setChatMessages([{ text: 'Failed to fetch summary.', sender: 'bot' }]);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMessage = { text: chatInput, sender: 'user' };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');

    try {
      const response = await axios.post(`${API_BASE_URL}/ask`, {
        file_id: currentDoc.fileId,
        question: chatInput,
      });
      setChatMessages((prev) => [...prev, { text: response.data.answer, sender: 'bot' }]);
    } catch (error) {
      setChatMessages((prev) => [...prev, { text: 'Error fetching response.', sender: 'bot' }]);
    }
  };

  const handleChatClose = () => {
    setShowChat(false);
    setCurrentDoc(null);
    setChatMessages([]);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return (
    <UserLayout>
      <div className="page-container">
        <Sidebar />
        <div className="page-content">
          {!showChat ? (
            <>
              <h1 className="page-title">Citizen Education</h1>
              <div className="documents-list">
                {documents.map((doc) => (
                  <div key={doc.id} className="document-item">
                    <div className="document-info">
                      <h3 className="document-title">{doc.title}</h3>
                      <p className="document-description">{doc.description}</p>
                    </div>
                    <div className="document-actions">
                      <button className="chat-button" onClick={() => handleChatOpen(doc)}>
                        Chat with doc
                      </button>
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="view-button">
                        <i className="fas fa-eye"></i>
                      </a>
                      <a href={doc.fileUrl} download className="download-button">
                        <i className="fas fa-download"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="chat-container">
              <div className="chat-header">
                <button className="back-button" onClick={handleChatClose}>
                  <i className="fas fa-arrow-left"></i> Back
                </button>
                <h2 className="chat-title">{currentDoc?.title}</h2>
              </div>
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  ref={index === chatMessages.length - 1 ? lastMessageRef : null}
                  >       
                    {msg.text}
                  </div>
                ))}
              </div>
              <form className="chat-input-form" onSubmit={handleChatSubmit}>
                <input
                  type="text"
                  className="chat-input"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything about the document"
                />
                <button type="submit" className="send-button">Send</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default CitizenEducationPage;