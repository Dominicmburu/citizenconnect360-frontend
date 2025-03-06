import React, {useState} from 'react';
import '../assets/styles/poll.css';

const PollCard = ({ poll, onVoteClick, onViewClick }) => {

  return (
    <div className="poll-card">
      <h3 className="poll-title">{poll.question}</h3>
      <p className="poll-ends-in">Ends on: {new Date(poll.endDate).toDateString()}</p>
      <div className="poll-actions">
        <button className="vote-button" onClick={onVoteClick}>Vote</button>
        <button className="view-button" onClick={onViewClick}>View Results</button>
      </div>
    </div>
  );
};

export default PollCard;