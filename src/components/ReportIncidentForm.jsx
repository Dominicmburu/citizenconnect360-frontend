import React, { useState, useEffect } from 'react';
import '../assets/styles/ReportIncidentForm.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReportIncidentForm = ({ onClose, onSubmit }) => {
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.description || !formData.location) {
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      if (formData.file) {
        formDataToSend.append('media', formData.file);
      }

      const response = await axios.post('http://localhost:5000/api/incidents/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response);

      toast.success('Incident reported successfully!');
      onSubmit(response.data.incident);
      onClose();
    } catch (error) {
      console.error('Error reporting incident:', error);
      toast.error('Failed to report incident. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-incident-container">
      <h2>Report an Incident</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Incident title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Description here"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <input
            type="file"
            name="media"
            onChange={handleFileChange}
            className="form-control file-input"
          />
        </div>
        
        <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Submitting...' : 'Submit Incident'}</button>
      </form>
    </div>
  );
};

export default ReportIncidentForm;