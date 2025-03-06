import React, { useEffect, useState } from "react";
import "../assets/styles/PollResultsView.css";

const PollResultsView = ({ poll, onClose }) => {  
  const colors = ["#FFC107", "#FF3D57", "#4CAF50", "#3F51B5"];

  const getPercentage = (count) => {
    return poll.numParticipants > 0 ? Math.round((count / poll.numParticipants) * 100) : 0;
  };

  return (
    <div className="poll-results-container">
      <h2 className="poll-question">{poll.question}</h2>
      <div className="participants-count">Participants: {poll.numParticipants}</div>
      
      {poll.votes && poll.options ? (
        <div className="results-chart">
          {poll.options.map((option, index) => {
            const percentage = getPercentage(poll.votes[index] || 0);            
            return (
              <div key={index} className="chart-item">
                <div 
                  className="bar" 
                  style={{
                    height: `${percentage}px`,
                    backgroundColor: colors[index % colors.length],
                  }}
                  title={`${option}: ${poll.votes[index]} votes (${percentage}%)`}
                ></div>
                <div className="label">{option}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading results...</p>
      )}
    </div>
  );
};

export default PollResultsView;