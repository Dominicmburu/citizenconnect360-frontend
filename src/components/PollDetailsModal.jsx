import React from "react";
import { X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PollDetailsModal = ({ poll, onClose }) => {
  if (!poll || !poll.options || !poll.votes) {
    return null; 
  }

  const votes = poll.votes.length === poll.options.length ? poll.votes : new Array(poll.options.length).fill(0);

  const chartData = poll.options.map((option, index) => ({
    option,
    votes: votes[index] || 0,
  }));

  const totalVotes = votes.reduce((a, b) => a + b, 0);

  return (
    <div className="modal-overlay">
      <div className="poll-details-modal">
        <div className="modal-header">
          <h2>Poll Details</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">
          <div className="poll-question">
            <h3>{poll.question}</h3>
            <p>Total Participants: {totalVotes}</p>
            <p>Poll Type: {poll.type}</p>
            <p>End Date: {new Date(poll.endDate).toLocaleDateString()}</p>
          </div>

          <div className="poll-chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="option" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#ffd700" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="poll-options">
            {chartData.map((item) => (
              <div key={item.option} className="poll-option-result">
                <span>{item.option}</span>
                <span>
                  {item.votes} votes (
                  {totalVotes > 0
                    ? ((item.votes / totalVotes) * 100).toFixed(1)
                    : 0}
                  %)
                </span>
              </div>
            ))}
          </div>

          <div className="poll-voters">
            <p>Voters: {poll.voters?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollDetailsModal;
