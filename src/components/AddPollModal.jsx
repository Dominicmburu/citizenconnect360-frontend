import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const AddPollModal = ({ onClose, onAddPoll }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [pollType, setPollType] = useState("radio");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question || options.some((opt) => opt.trim() === "")) {
      toast.error("Please fill in all fields!");
      return;
    }

    const newPoll = {
      question,
      options,
      type: pollType,
      endDate: endDate
        ? new Date(endDate).toISOString()
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    setLoading(true);
    onAddPoll(newPoll);
  }

  //   try {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       toast.error("No authentication token found!");
  //       return;
  //     }

  //     const response = await fetch("http://localhost:5000/api/polls/create", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newPoll),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create poll");
  //     }

  //     const data = await response.json();
  //     onAddPoll(data);
  //     toast.success("Poll created successfully! 🎉");
  //     onClose();
  //   } catch (err) {
  //     toast.error(`Error: ${err.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="modal-overlay">
      <div className="add-poll-modal">
        <div className="modal-header">
          <h2>Create New Poll</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">
          <div className="poll-input-group">
            <label>Poll Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your poll question"
            />
          </div>

          <div className="poll-input-group">
            <label>Poll Type</label>
            <select
              value={pollType}
              onChange={(e) => setPollType(e.target.value)}
            >
              <option value="radio">Single Select</option>
              <option value="checkbox">Multiple Select</option>
            </select>
          </div>

          <div className="poll-input-group">
            <label>Poll Options</label>
            {options.map((option, index) => (
              <div key={index} className="poll-option-input">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                {options.length > 2 && (
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="remove-option-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            <button onClick={handleAddOption} className="add-option-btn">
              <Plus size={16} /> Add Option
            </button>
          </div>

          <div className="poll-input-group">
            <label>End Date (Optional)</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button
              onClick={handleSubmit}
              className="create-poll-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Poll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPollModal;
