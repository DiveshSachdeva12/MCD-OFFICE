import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaUser, FaPhoneAlt, FaHome, FaAlignLeft, FaHashtag, FaBuilding } from 'react-icons/fa';
import { BASE_URL } from '../api/baseUrl';

const ComplaintForm = () => {
  const [form, setForm] = useState({
    complaintId: 'C' + Date.now(),
    name: '',
    phone: '',
    address: '',
    department: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["name", "address", "details"].includes(name)) {
      setForm({ ...form, [name]: value.toUpperCase() });
    } else if (name === "phone" && /^\d{0,10}$/.test(value)) {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Complaint:", form);  // 👈 Add this

    try {
      await axios.post(`${BASE_URL}/api/complaints`, form);

      Swal.fire({
        title: "Success!",
        text: "Your complaint has been submitted successfully.",
        icon: "success",
        confirmButtonText: "OK"
      });

      setForm({
        complaintId: 'C' + Date.now(),
        name: '',
        phone: '',
        address: '',
        department: '',
        details: ''
      });
    } catch (err) {
      Swal.fire({
        title: "त्रुटि!",
        text: "शिकायत सबमिट करने में समस्या आई। कृपया पुनः प्रयास करें।",
        icon: "warning",
        confirmButtonText: "ठीक है"
      });
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
        <div
          className="card-header text-white text-center py-4"
          style={{ background: '#0b5394', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
        >
          <h4 className="fw-bold">📄 शिकायत फॉर्म / COMPLAINT FORM</h4>
        </div>
        <div className="col-12">
  <div
    className="alert alert-warning d-flex align-items-start p-3 rounded-3 shadow-sm"
    role="alert"
    style={{ fontSize: "1.1rem", backgroundColor: "#fff3cd", borderLeft: "5px solid #ffc107" }}
  >
    <span className="me-3 fs-3">⚠️</span>
    <div>
      <strong>नोट:</strong> कृपया अपनी <strong>Complaint ID</strong> को सुरक्षित रखें। भविष्य में आपकी शिकायत का समाधान इसी ID के आधार पर किया जाएगा।
      <br />
      <strong>Note:</strong> Please save your <strong>Complaint ID</strong>. It will be used to resolve your complaint in future.
    </div>
  </div>
</div>

        <div className="card-body px-4 px-md-5 py-4 bg-light">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <FaHashtag className="me-2 text-secondary" /> Complaint ID
                </label>
                <input
                  type="text"
                  name="complaintId"
                  className="form-control bg-white"
                  value={form.complaintId}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <FaUser className="me-2 text-secondary" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="अपना पूरा नाम"
                  value={form.name}
                  onChange={handleChange}
                  required
                  pattern="[A-Z\s]{3,}"
                  title="कम से कम 3 अक्षर और केवल अक्षर उपयोग करें"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <FaPhoneAlt className="me-2 text-secondary" /> Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="10 अंकों का मोबाइल नंबर"
                  value={form.phone}
                  onChange={handleChange}
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength="10"
                  title="10 अंकों का मोबाइल नंबर दर्ज करें"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <FaHome className="me-2 text-secondary" /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="अपना पता लिखें"
                  value={form.address}
                  onChange={handleChange}
                  required
                  minLength={10}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <FaBuilding className="me-2 text-secondary" /> Complaint Department
                </label>
                <select
                  name="department"
                  className="form-select"
                  value={form.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- विभाग चुनें / Select Department --</option>
                  <option value="AADHAAR CARD ISSUE">AADHAAR CARD ISSUE</option>
                  <option value="PAN CARD ISSUE">PAN CARD ISSUE</option>
                  <option value="SEWER PROBLEM">SEWER PROBLEM</option>
                  <option value="WATER SUPPLY ISSUE">WATER SUPPLY ISSUE</option>
                  <option value="STREET LIGHT NOT WORKING">STREET LIGHT NOT WORKING</option>
                  <option value="ROAD OR DRAIN DAMAGE">ROAD OR DRAIN DAMAGE</option>
                  <option value="GARBAGE COLLECTION">GARBAGE COLLECTION</option>
                  <option value="PROPERTY TAX RELATED">PROPERTY TAX RELATED</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  <FaAlignLeft className="me-2 text-secondary" /> Complaint Details
                </label>
                <textarea
                  name="details"
                  className="form-control"
                  placeholder="शिकायत का विवरण दें"
                  value={form.details}
                  onChange={handleChange}
                  rows="5"
                  required
                  minLength={10}
                ></textarea>
              </div>

              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold">
                  📝 SUBMIT COMPLAINT / शिकायत दर्ज करें
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
