import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../api/baseUrl';
const KiteForm = () => {
  const [form, setForm] = useState({
    aadhaar: '',
    name: '',
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "aadhaar") {
      if (/^\d{0,12}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "name") {
      setForm({ ...form, [name]: value.toUpperCase() });
    } else if (name === "quantity") {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 1 && num <= 10) {
        setForm({ ...form, [name]: value });
      } else if (value === "") {
        setForm({ ...form, [name]: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await axios.post(`${BASE_URL}/api/kites`, form);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: res.data.message,
        confirmButtonColor: '#198754'
      });

      setForm({ aadhaar: '', name: '', quantity: '' });

    } catch (err) {
      if (err.response && err.response.status === 400) {
        Swal.fire({
          icon: 'warning',
          title: 'Duplicate Entry',
          text: err.response.data.message,
          confirmButtonColor: '#d33'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#d33'
        });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-success rounded-4">
        <div className="card-header bg-success text-white text-center rounded-top-4">
          <h4 className="mb-0"><i className="bi bi-send-check-fill me-2"></i>Kite Distribution Form</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Aadhaar */}
            <div className="mb-3">
              <label className="form-label fw-bold">Aadhaar Number</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-credit-card-2-front"></i></span>
                <input
                  type="text"
                  name="aadhaar"
                  className="form-control"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={form.aadhaar}
                  onChange={handleChange}
                  required
                  pattern="\d{12}"
                  title="Aadhaar must be 12 digits"
                />
              </div>
            </div>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person-bounding-box"></i></span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  pattern="[A-Z\s]{3,}"
                  title="Name must be at least 3 letters and in uppercase"
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label className="form-label fw-bold">Number of Kites</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-box-seam"></i></span>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  placeholder="Enter number of kites (max 10)"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  min={1}
                  max={10}
                />
              </div>
              <div className="form-text text-muted">
                Maximum allowed per Aadhaar is 10 kites.
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg fw-semibold rounded-pill">
                <i className="bi bi-check2-circle me-2"></i>Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KiteForm;
