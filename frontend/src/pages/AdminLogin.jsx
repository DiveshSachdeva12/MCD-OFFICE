import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Swal from 'sweetalert2';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === '1326') {
      login();
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Redirecting to Admin Dashboard...',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/admin-dashboard');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Incorrect password, please try again.',
      });
    }
  };

  return (
  <div className="bg-light min-vh-50 py-5 d-flex justify-content-center">
    <div className="card shadow" style={{ width: '100%', maxWidth: '400px' }}>
      <div className="card-body p-4">
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
          >
            🔐
          </div>
          <h3 className="mt-3">Admin Login</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Authorized users only
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
);

}
