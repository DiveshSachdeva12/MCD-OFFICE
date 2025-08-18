import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../api/baseUrl';

// Verhoeff algorithm tables
const d = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,2,3,4,0,6,7,8,9,5],
  [2,3,4,0,1,7,8,9,5,6],
  [3,4,0,1,2,8,9,5,6,7],
  [4,0,1,2,3,9,5,6,7,8],
  [5,9,8,7,6,0,4,3,2,1],
  [6,5,9,8,7,1,0,4,3,2],
  [7,6,5,9,8,2,1,0,4,3],
  [8,7,6,5,9,3,2,1,0,4],
  [9,8,7,6,5,4,3,2,1,0]
];

const p = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,5,7,6,2,8,3,0,9,4],
  [5,8,0,3,7,9,6,1,4,2],
  [8,9,1,6,0,4,3,5,2,7],
  [9,4,5,3,1,2,6,8,7,0],
  [4,2,8,6,5,7,3,9,0,1],
  [2,7,9,3,8,0,6,4,1,5],
  [7,0,4,6,9,1,3,2,5,8]
];

const inv = [0,4,3,2,1,5,6,7,8,9];

function validateVerhoeff(num) {
  let c = 0;
  const myArray = num.split('').reverse().map(x => parseInt(x, 10));
  for (let i = 0; i < myArray.length; i++) {
    c = d[c][p[(i % 8)][myArray[i]]];
  }
  return c === 0;
}

const formatAadhaarNumber = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

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

    if (name === 'aadhaarNumber') {
      const formattedValue = formatAadhaarNumber(value);
      setAadhaarData({ ...aadhaarData, [name]: formattedValue });
    } else if (name === 'mobile' && /^\d{0,10}$/.test(value)) {
      setAadhaarData({ ...aadhaarData, [name]: value });
    } else {
      setAadhaarData({ ...aadhaarData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanAadhaarNumber = aadhaarData.aadhaarNumber.replace(/\s/g, '');

    if (cleanAadhaarNumber.length !== 12 || !validateVerhoeff(cleanAadhaarNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Aadhaar Number',
        text: 'Please enter a valid 12-digit Aadhaar number.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/aadhaar`, {
        ...aadhaarData,
        aadhaarNumber: cleanAadhaarNumber // send without spaces
      });

      Swal.fire({
        icon: 'success',
        title: 'Form Submitted',
        text: '✅ Aadhaar form submitted successfully',
        confirmButtonColor: '#28a745'
      });

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
            maxLength="14"
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
