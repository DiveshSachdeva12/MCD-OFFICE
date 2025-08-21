import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../api/baseUrl';

const AadhaarForm = () => {
  const [aadhaarData, setAadhaarData] = useState({
    fullName: '',
    address: '',
    aadhaarNumber: '',
    mobile: '',
    dob: '',
    addressChange: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAadhaarData({ ...aadhaarData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/aadhaar`, aadhaarData);

      Swal.fire({
        icon: 'success',
        title: 'Form Submitted',
        text: '✅ Aadhaar form submitted successfully',
        confirmButtonColor: '#28a745'
      });

      // Reset form
      setAadhaarData({
        fullName: '',
        address: '',
        aadhaarNumber: '',
        mobile: '',
        dob: '',
        addressChange: ''
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: '❌ There was an error submitting the Aadhaar form.',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border rounded-3 p-4 bg-white shadow">
      <h5 className="mb-3 fw-bold text-primary">🔷 Aadhaar Card Correction Request</h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Enter full name"
            value={aadhaarData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Registered Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter current address"
            value={aadhaarData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Aadhaar Number</label>
          <input
            type="text"
            name="aadhaarNumber"
            className="form-control"
            placeholder="1234 5678 9012"
            maxLength="12"
            value={aadhaarData.aadhaarNumber}
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
            placeholder="10-digit mobile number"
            maxLength="10"
            value={aadhaarData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={aadhaarData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Address Change Request</label>
          <input
            type="text"
            name="addressChange"
            className="form-control"
            placeholder="Enter new address (if requesting change)"
            value={aadhaarData.addressChange}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4 text-end">
        <button type="submit" className="btn btn-success px-4">
          Submit Aadhaar Info
        </button>
      </div>
    </form>
  );
};

export default AadhaarForm;
