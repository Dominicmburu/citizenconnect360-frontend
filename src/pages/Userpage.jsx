import React, { useState, useEffect } from 'react';
import '../assets/styles/userDash.css';
import Sidebar from "../components/Sidebar";
import PollCard from "../components/PollCard";
import UserLayout from "../components/UserLayout";
import ReportIncidentForm from "../components/ReportIncidentForm";
import PollVotingForm from "../components/PollVotingForm";
import PollResultsView from "../components/PollResultsView";

const Userpage = () => {
  const [polls, setPolls] = useState([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showVotingForm, setShowVotingForm ] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/polls");
      const data = await response.json();
      setPolls(data.polls);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const handleReportClick = () => {
    setShowReportForm(true);
  };
  
  const handleReportSubmit = (formData) => {
    console.log('Incident report submitted:', formData);
    setShowReportForm(false);
  };

  const handleVoteClick = (poll) => {
    setSelectedPoll(poll);
    setShowVotingForm(true);
  };

  const handleViewClick = (poll) => {
    setSelectedPoll(poll);
    setShowResults(true);
  };

  return (
    <UserLayout>
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <div className="action-buttons">
            <button className="report-button" onClick={handleReportClick}>
              <i className="fas fa-flag"></i> Report Incident
            </button>
            {/* <button className="create-poll-button">
              <i className="fas fa-plus"></i> Create poll
            </button> */}
            {/* <button className="active-button">Active</button> */}
          </div>

          <h2 className="section-title">Current Public Polls</h2>

          <div className="polls-grid">
            {polls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onVoteClick={() => handleVoteClick(poll)}
                onViewClick={() => handleViewClick(poll)}
              />
            ))}
          </div>
        </div>
      </div>

      {showReportForm && (
        <div id='modal' className="modal">
          <div className="modal-content-form">
            <span className="close" onClick={() => setShowReportForm(false)}>&times;</span>
            <ReportIncidentForm 
              onSubmit={handleReportSubmit} 
              onClose={() => setShowReportForm(false)} 
            />
          </div>
        </div>
      )}

      {showVotingForm && selectedPoll && (
        <div id='modal' className="modal">
          <div className="modal-content-form">
            <span className="close" onClick={() => setShowVotingForm(false)}>&times;</span>
            <PollVotingForm
              poll={selectedPoll}
              onSubmit={() => setShowVotingForm(false)}
              onClose={() => setShowVotingForm(false)}
              refreshPolls={fetchPolls()}
            />
          </div>
        </div>
      )}

      {showResults && selectedPoll && (
        <div id='modal' className="modal">
          <div className="modal-content-form">
            <span className="close" onClick={() => setShowResults(false)}>&times;</span>
            <PollResultsView
              poll={selectedPoll}
              onClose={() => setShowResults(false)}
            />
          </div>
        </div>
      )}

    </UserLayout>
  );
};

export default Userpage;
