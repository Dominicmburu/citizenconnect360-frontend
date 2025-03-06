import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../assets/styles/polls.css";
import AdminLayout from "../components/AdminLayout";
import AdminSidebar from "../components/AdminSidebar";
import PollDetailsModal from "../components/PollDetailsModal";
import AddPollModal from "../components/AddPollModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const API_BASE_URL = "http://localhost:5000/api/polls";

const AdminPolls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddPollModalOpen, setIsAddPollModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setPolls(response.data.polls);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const handleViewPoll = async (poll) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No authentication token found!");
        return;
      }
  
      const response = await axios.get(`${API_BASE_URL}/${poll.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      setSelectedPoll(response.data.poll);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error("Error fetching poll details:", error);
    }
  };
  

  const handleDeletePoll = async (pollId) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No authentication token found!");
        return;
      }
  
      await axios.delete(`${API_BASE_URL}/${pollId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      setPolls(polls.filter((p) => p.id !== pollId));
      setIsDeleteModalOpen(false);
      toast.success("Poll deleted successfully! ✅");
    } catch (error) {
      console.error("Error deleting poll:", error);
      toast.error("Failed to delete poll. ❌");
    }
  };
  

  const handleAddPoll = async (newPoll) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found!");
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/create`, newPoll, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setPolls([...polls, response.data]);
      setIsAddPollModalOpen(false);
      toast.success("Poll created successfully! 🎉");
    } catch (error) {
      console.error("Error creating poll:", error);
      toast.error("Failed to create poll. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        <AdminSidebar />
        <div className="poll-content">
          <div className="polls-header">
            <button
              className="add-poll-btn"
              onClick={() => setIsAddPollModalOpen(true)}
            >
              Add New Poll
            </button>
          </div>
          <div className="polls-content">
            {polls.map((poll) => (
              <div className="poll-row" key={poll.id}>
                <div className="poll-details">
                  <span>{poll.question}</span>
                  <span>Participants [{poll.numParticipants}]</span>
                </div>
                <div className="poll-actions">
                  <button onClick={() => handleViewPoll(poll)}>View</button>
                  <button
                    onClick={() => {
                      setSelectedPoll(poll);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modals */}
          {isDetailsModalOpen && (
            <PollDetailsModal
              poll={selectedPoll}
              onClose={() => setIsDetailsModalOpen(false)}
            />
          )}

          {isAddPollModalOpen && (
            <AddPollModal
              onClose={() => setIsAddPollModalOpen(false)}
              onAddPoll={handleAddPoll}
            />
          )}

          {isDeleteModalOpen && (
            <ConfirmDeleteModal
              poll={selectedPoll}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={() => handleDeletePoll(selectedPoll.id)}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPolls;
