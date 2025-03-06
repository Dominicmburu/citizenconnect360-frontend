import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/feedbacks.css";
import { toast } from "react-toastify";
import AdminLayout from "../components/AdminLayout";
import AdminSidebar from "../components/AdminSidebar";
import CreateTopicModal from "../components/CreateTopicModal";
import FeedbackDetailsModal from "../components/FeedbackDetailsModal";
import ConfirmDeleteModal from "../components/FeedbackConfirmDeleteModal";
import AISummaryModal from "../components/AISummaryModal";

const API_BASE_URL = "http://localhost:5000/api/feedback";

const AdminFeedback = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [loadingTopicId, setLoadingTopicId] = useState(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/topics`);
      setTopics(response.data.topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast.error("Failed to load topics.");
    }
  };

  const handleCreateTopic = async (newTopic) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        `${API_BASE_URL}/topics`,
        newTopic,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      setTopics([...topics, response.data]); 
      setIsCreateTopicModalOpen(false);
      toast.success("Topic created successfully!");
    } catch (error) {
      console.error("Error creating topic:", error);
      toast.error(error.response?.data?.message || "Failed to create topic.");
    }
  };
  

  const handleViewTopic = async (topic) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/feedback/${topic.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedTopic = { ...topic, feedbacks: response.data.feedback || []};
      setSelectedTopic(updatedTopic);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to fetch feedback details.");
    }
  };

  const handleDeleteTopic = (topic) => {
    setSelectedTopic(topic);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTopic = async () => {
    toast.error("Not Yer Implemented");
  };

  const handleGetSummary = async (topic) => {
    if (loadingTopicId) return; // Prevent multiple requests

    setLoadingTopicId(topic.id); // Disable button

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/analyze-feedback",
        {
          topic: topic.title,
          feedbacks: topic.feedbacks || [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedTopic = { ...topic, aiSummary: response.data.insights };
      setSelectedTopic(updatedTopic);
      setIsSummaryModalOpen(true);
    } catch (error) {
      console.error("Error generating AI summary:", error);
      toast.error("Failed to generate AI insights.");
    } finally {
      setLoadingTopicId(null); // Re-enable button
    }
  };
  

  return (
    <AdminLayout>
      <div className="admin-container">
        <AdminSidebar/>
        <div className="feedbacks">
          <div className="feedback-header">
            <button 
              className="create-topic-btn"
              onClick={() => setIsCreateTopicModalOpen(true)}
            >
              Create New Topic
            </button>
          </div>
          <div className="feedback-content">
            {topics.map((topic) => (
              <div className="feedback-row" key={topic.id}>
                <div className="feedback-details">
                  <span>{topic.title}</span>
                  <span>{topic.description}</span>
                </div>
                <div className="feedback-actions">
                  <button onClick={() => handleGetSummary(topic)}>Get Summary</button>
                  <button onClick={() => handleViewTopic(topic)}>View</button>
                  <button onClick={() => handleDeleteTopic(topic)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Modals */}
          {isCreateTopicModalOpen && (
            <CreateTopicModal 
              onClose={() => setIsCreateTopicModalOpen(false)}
              onCreateTopic={handleCreateTopic}
            />
          )}

          {isDetailsModalOpen && (
            <FeedbackDetailsModal 
              topic={selectedTopic}
              onClose={() => setIsDetailsModalOpen(false)}
            />
          )}

          {isDeleteModalOpen && (
            <ConfirmDeleteModal 
              item={selectedTopic}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={confirmDeleteTopic}
              itemType="topic"
            />
          )}

          {isSummaryModalOpen && (
            <AISummaryModal 
              topic={selectedTopic}
              onClose={() => setIsSummaryModalOpen(false)}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFeedback;