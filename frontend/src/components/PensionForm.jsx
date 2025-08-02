import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // ✅ Import SweetAlert2
import { BASE_URL } from '../api/baseUrl';

const PensionForm = () => {
  const [pensionData, setPensionData] = useState({
    fullName: '',
    registrationNo: '',
    password: '',
    mobile: '',
    applicationNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile' && /^\d{0,10}$/.test(value)) {
      setPensionData({ ...pensionData, [name]: value });
    } else {
      setPensionData({ ...pensionData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/pension`, pensionData);
      Swal.fire({
        icon: 'success',
        title: 'Form Submitted',
        text: '✅ Pension form submitted successfully',
        confirmButtonColor: '#28a745'
      });
      setPensionData({
        fullName: '',
        registrationNo: '',
        password: '',
        mobile: '',
        applicationNo: ''
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: '❌ Error submitting Pension form',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border rounded-3 p-4 bg-white shadow">
      <h5 className="mb-3 fw-bold text-primary">📄 Pension Details Form</h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Enter full name"
            value={pensionData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Registration Number</label>
          <input
            type="text"
            name="registrationNo"
            className="form-control"
            placeholder="Enter registration number"
            value={pensionData.registrationNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={pensionData.password}
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
            placeholder="Enter 10-digit mobile"
            value={pensionData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Application Number</label>
          <input
            type="text"
            name="applicationNo"
            className="form-control"
            placeholder="Enter application number"
            value={pensionData.applicationNo}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mt-4 text-end">
        <button type="submit" className="btn btn-success px-4">
          Submit Pension Info
        </button>
      </div>
    </form>
  );
};

export default PensionForm;
