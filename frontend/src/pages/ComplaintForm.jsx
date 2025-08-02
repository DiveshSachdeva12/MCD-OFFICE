import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  FaUser,
  FaPhoneAlt,
  FaHome,
  FaAlignLeft,
  FaHashtag,
  FaBuilding
} from 'react-icons/fa';
import { BASE_URL } from '../api/baseUrl';
import AadhaarForm from '../components/AadhaarForm';
import PensionForm from '../components/PensionForm';
import VoterIdForm from '../components/VoterIdForm';

const ComplaintForm = () => {
  const isAuthorized = true;

  const [form, setForm] = useState({
    complaintId: 'C' + Date.now(),
    name: '',
    phone: '',
    address: '',
    department: '',
    details: ''
  });

  const [selectedForm, setSelectedForm] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'department') {
      if (
        ['AADHAAR CARD ISSUE', 'PENSION FORM', 'VOTER ID CARD ISSUE'].includes(value) &&
        isAuthorized
      ) {
        const { isConfirmed, value: password } = await Swal.fire({
          title: 'Enter Password',
          input: 'password',
          inputPlaceholder: 'Enter access password',
          showCancelButton: true,
          confirmButtonText: 'Submit',
        });

        if (isConfirmed) {
          if (password === '13277') {
            const formType = value.toLowerCase().includes('aadhaar')
              ? 'aadhaar'
              : value.toLowerCase().includes('pension')
              ? 'pension'
              : 'voter';

            setSelectedForm(formType);
            setShowModal(true);
          } else {
            Swal.fire('Access Denied', 'Incorrect password.', 'error');
            setSelectedForm(null);
            setShowModal(false);
          }
        } else {
          setSelectedForm(null);
          setShowModal(false);
        }

        setForm({ ...form, [name]: value });
        return;
      }

      setSelectedForm(null);
      setShowModal(false);
    }

    if (['name', 'address', 'details'].includes(name)) {
      setForm({ ...form, [name]: value.toUpperCase() });
    } else if (name === 'phone' && /^\d{0,10}$/.test(value)) {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/complaints`, form);
      Swal.fire('Success', 'Complaint submitted successfully!', 'success');
      setForm({
        complaintId: 'C' + Date.now(),
        name: '',
        phone: '',
        address: '',
        department: '',
        details: ''
      });
      setSelectedForm(null);
      setShowModal(false);
    } catch {
      Swal.fire('Error', 'Failed to submit complaint', 'error');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header text-white text-center py-4" style={{ background: '#0b5394' }}>
          <h4>📄 Complaint Form</h4>
          <div className="alert alert-warning text-center rounded-3 fs-6 mb-4">
            ⚠️ <strong>Important:</strong> Please fill your details carefully and clearly. Incorrect or incomplete info may lead to rejection.<br />
            ⚠️ Your Complaint ID: <strong>{form.complaintId}</strong>
          </div>
        </div>

        <div className="card-body px-4 py-4 bg-light">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label"><FaHashtag /> Complaint ID</label>
                <input type="text" className="form-control" value={form.complaintId} disabled />
              </div>

              <div className="col-md-6">
                <label className="form-label"><FaUser /> Full Name</label>
                <input type="text" name="name" className="form-control" placeholder="Enter full name" value={form.name} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label"><FaPhoneAlt /> Mobile Number</label>
                <input type="text" name="phone" className="form-control" placeholder="10-digit mobile number" maxLength={10} value={form.phone} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label"><FaHome /> Address</label>
                <input type="text" name="address" className="form-control" placeholder="Enter address" value={form.address} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label"><FaBuilding /> Department</label>
                <select name="department" className="form-select" value={form.department} onChange={handleChange} required>
                  <option value="">-- Select Department --</option>
                  <option value="AADHAAR CARD ISSUE">AADHAAR CARD ISSUE</option>
                  <option value="PENSION FORM">PENSION FORM</option>
                  <option value="VOTER ID CARD ISSUE">VOTER ID CARD ISSUE</option>
                  <option value="SEWER PROBLEM">SEWER PROBLEM</option>
                  <option value="WATER SUPPLY ISSUE">WATER SUPPLY ISSUE</option>
                  <option value="STREET LIGHT NOT WORKING">STREET LIGHT NOT WORKING</option>
                  <option value="ROAD OR DRAIN DAMAGE">ROAD OR DRAIN DAMAGE</option>
                  <option value="GARBAGE COLLECTION">GARBAGE COLLECTION</option>
                  <option value="MCD">MCD</option>
                  <option value="DJB">DJB</option>
                  <option value="BSES">BSES</option>
                  <option value="DUSIB-SLUM">DUSIB-SLUM</option>
                  <option value="PWD">PWD</option>
                  <option value="DSIIDC">DSIIDC</option>
                  <option value="HOSPITAL">HOSPITAL</option>
                  <option value="SCHOOL">SCHOOL</option>
                  <option value="LIBRARY">LIBRARY</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label"><FaAlignLeft /> Complaint Details</label>
                <textarea name="details" className="form-control" rows="4" placeholder="Write your complaint here..." value={form.details} onChange={handleChange} required></textarea>
              </div>

              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-primary w-100">
                  📝 Submit Complaint
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {selectedForm === 'aadhaar' && 'Aadhaar Form'}
                  {selectedForm === 'pension' && 'Pension Form'}
                  {selectedForm === 'voter' && 'Voter ID Form'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {selectedForm === 'aadhaar' && <AadhaarForm />}
                {selectedForm === 'pension' && <PensionForm />}
                {selectedForm === 'voter' && <VoterIdForm />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintForm;
