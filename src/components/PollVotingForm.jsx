import React, { useState } from "react";
import "../assets/styles/PollVotingForm.css";
import { toast } from "react-toastify";

const PollVotingForm = ({ poll, onSubmit, onClose, refreshPolls }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const isPollExpired = new Date(poll.endDate) < new Date();

  const handleOptionChange = (index) => {
    if (poll.type === "checkbox") {
      setSelectedOptions((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setSelectedOptions([index]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOptions.length === 0 || isPollExpired) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/polls/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pollId: poll.id,
          optionIndex:
            poll.type === "checkbox" ? selectedOptions : selectedOptions[0],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      
      toast.success("Vote submitted successfully!");
      refreshPolls();
      onSubmit();
    } catch (error) {
      console.error("Error submitting vote:", error);
      // toast.error("Failed to submit your vote");
    }
  };

  return (
    <div className="poll-voting-container">
      <div className="participants-count">
        Participants [{poll.numParticipants}]
      </div>

      <h2 className="poll-question">{poll.question}</h2>

      {isPollExpired ? (
        <p className="poll-expired-message">
          This poll has expired. You can only view the results.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="poll-options">
            {poll.options.map((option, index) => (
              <label
              key={index}
              className={`option ${selectedOptions.includes(index) ? "selected-option" : ""}`}
            >
                <input
                  type={poll.type === "checkbox" ? "checkbox" : "radio"}
                  name="pollOption"
                  onChange={() => handleOptionChange(index)}
                  checked={selectedOptions.includes(index)}
                />
                <span className="custom-radio"></span>
                {option}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="submit-poll-btn"
            disabled={selectedOptions.length === 0 || isPollExpired}
          >
            Submit Vote
          </button>
        </form>
      )}
    </div>
  );
};

export default PollVotingForm;
