import React, { useState, useEffect } from "react";
import UserLayout from "../components/UserLayout";
import Sidebar from "../components/Sidebar";
import "../assets/styles/FeedbackPage.css";
import { toast } from "react-toastify";

const FeedbackPage = () => {
  const [topics, setTopics] = useState([]); // Store topics from the backend
  const [feedbackData, setFeedbackData] = useState({
    topicId: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Fetch topics from the backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/feedback/topics"
        );
        const data = await response.json();
        if (data.success) {
          setTopics(data.topics);
        } else {
          toast.error("Failed to load topics.");
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast.error("An error occurred while fetching topics.");
      }
    };
    fetchTopics();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackData.topicId || !feedbackData.message.trim()) {
      toast.error("Please select a topic and enter your feedback.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User may need to log in.");
        toast.error("Authentication required. Please log in.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/feedback/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            topicId: Number(feedbackData.topicId),
            message: feedbackData.message,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Feedback submitted successfully!");
        setSubmitted(true);
        setTimeout(() => {
          setFeedbackData({ topicId: "", message: "" });
          setSubmitted(false);
        }, 3000);
      } else {
        toast.error("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred while submitting feedback.");
    }
  };

  return (
    <UserLayout>
      <div className="page-container">
        <Sidebar />
        <div className="page-content">
          <h1 className="page-title">Feedback</h1>

          {submitted ? (
            <div className="feedback-success">
              <h2>Thank you for your feedback!</h2>
              <p>Your submission has been received.</p>
            </div>
          ) : (
            <div className="feedback-form-container">
              <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="topic">Select a Topic:</label>
                  <select
                    name="topicId"
                    value={feedbackData.topicId}
                    onChange={handleChange}
                    className="feedback-input"
                    required
                  >
                    <option value="">-- Choose a Topic --</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Feedback:</label>
                  <textarea
                    name="message"
                    placeholder="Enter your feedback..."
                    value={feedbackData.message}
                    onChange={handleChange}
                    className="feedback-textarea"
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-feedback-button">
                  Submit Feedback
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default FeedbackPage;
