import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../api/baseUrl';

const VoterIdForm = () => {
  const [voterData, setVoterData] = useState({
    fullName: '',
    mobile: '',
    applicationNo: '',
    voterCardNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile' && /^\d{0,10}$/.test(value)) {
      setVoterData({ ...voterData, [name]: value });
    } else {
      setVoterData({ ...voterData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${BASE_URL}/api/voter`, voterData);  // ✅ fixed endpoint
    Swal.fire({
      icon: 'success',
      title: 'Submitted!',
      text: '✅ Voter ID form submitted successfully'
    });
    setVoterData({
      fullName: '',
      mobile: '',
      applicationNo: '',
      voterCardNo: ''
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: '❌ Error submitting Voter ID form'
    });
  }
};


  return (
    <form onSubmit={handleSubmit} className="mt-4 border rounded-3 p-4 bg-white shadow-sm">
      <h5 className="mb-3 fw-bold text-primary">🗳️ Voter ID Card Form</h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Enter full name"
            value={voterData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            className="form-control"
            maxLength="10"
            placeholder="Enter mobile number"
            value={voterData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Application Number</label>
          <input
            type="text"
            name="applicationNo"
            className="form-control"
            placeholder="Enter application number"
            value={voterData.applicationNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Voter Card Number</label>
          <input
            type="text"
            name="voterCardNo"
            className="form-control"
            placeholder="Enter voter card number"
            value={voterData.voterCardNo}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4 text-end">
        <button type="submit" className="btn btn-success px-4">
          Submit Voter Info
        </button>
      </div>
    </form>
  );
};

export default VoterIdForm;
