import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/baseUrl';
import Swal from 'sweetalert2';

export default function AddScheduleForm() {
  const [formData, setFormData] = useState({
    programName: '',
    date: '',
    time: '',
    meridiem: 'AM',
    venue: '',
    contactPerson: '',
    contactNumber: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isUpperCaseField = ['programName', 'venue', 'contactPerson', 'description'].includes(name);

    setFormData((prev) => ({
      ...prev,
      [name]: isUpperCaseField ? value.toUpperCase() : value
    }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const formErrors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.programName.trim()) formErrors.programName = 'Program name is required';
    if (!formData.date) formErrors.date = 'Date is required';
    if (!formData.time) formErrors.time = 'Time is required';
    if (!formData.venue.trim()) formErrors.venue = 'Venue is required';
    if (!formData.contactPerson.trim()) formErrors.contactPerson = 'Contact person is required';
    if (!phoneRegex.test(formData.contactNumber)) formErrors.contactNumber = 'Phone must be 10 digits';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const formatDateToDDMMYYYY = (dateStr) => {
    const [yyyy, mm, dd] = dateStr.split('-');
    return `${dd}-${mm}-${yyyy}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire('Invalid Input', 'Please fill all required fields correctly.', 'warning');
      return;
    }

    const fullTime = `${formData.time} ${formData.meridiem}`;
    const formattedDate = formatDateToDDMMYYYY(formData.date);

    const submissionData = {
      programName: formData.programName,
      date: formattedDate,
      time: fullTime,
      venue: formData.venue,
      contactPerson: formData.contactPerson,
      contactNumber: formData.contactNumber,
      description: formData.description
    };

    try {
      await axios.post(`${BASE_URL}/api/schedules`, submissionData);
      Swal.fire('Success!', 'Schedule added successfully.', 'success');
      setFormData({
        programName: '',
        date: '',
        time: '',
        meridiem: 'AM',
        venue: '',
        contactPerson: '',
        contactNumber: '',
        description: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Add Schedule Error:', error.response?.data || error.message);
      Swal.fire('Error', 'Failed to add schedule.', 'error');
    }
  };

  return (
    <div className="card p-4">
      <h5>Add Program Schedule</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Program Name</label>
          <input
            className={`form-control ${errors.programName ? 'is-invalid' : ''}`}
            name="programName"
            value={formData.programName}
            onChange={handleChange}
          />
          {errors.programName && <div className="invalid-feedback">{errors.programName}</div>}
        </div>

        <div className="mb-2">
          <label>Date (DD-MM-YYYY)</label>
          <input
            type="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <div className="mb-2 d-flex gap-2">
          <div className="flex-grow-1">
            <label>Time</label>
            <input
              type="time"
              className={`form-control ${errors.time ? 'is-invalid' : ''}`}
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <div className="invalid-feedback">{errors.time}</div>}
          </div>
          <div>
            <label>AM/PM</label>
            <select
              className="form-control"
              name="meridiem"
              value={formData.meridiem}
              onChange={handleChange}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="mb-2">
          <label>Venue</label>
          <input
            className={`form-control ${errors.venue ? 'is-invalid' : ''}`}
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
          {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
        </div>

        <div className="mb-2">
          <label>Contact Person</label>
          <input
            className={`form-control ${errors.contactPerson ? 'is-invalid' : ''}`}
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />
          {errors.contactPerson && <div className="invalid-feedback">{errors.contactPerson}</div>}
        </div>

        <div className="mb-2">
          <label>Contact Number</label>
          <input
            className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            maxLength="10"
          />
          {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
        </div>

        <div className="mb-2">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Schedule</button>
      </form>
    </div>
  );
}
