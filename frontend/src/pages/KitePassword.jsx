import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function KitePassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAccess = (e) => {
    e.preventDefault();

    if (password === 'yourStrongPassword123') {
      Swal.fire({
        icon: 'success',
        title: 'Access Granted',
        timer: 1200,
        showConfirmButton: false,
      }).then(() => {
        navigate('/kite-distribution');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Wrong password!',
      });
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h4 className="mb-4 text-danger fw-bold">🔒 Enter Admin Password to Access</h4>
      <form onSubmit={handleAccess} className="d-inline-block w-100" style={{ maxWidth: '400px' }}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success btn-lg w-100" type="submit">
          Access Kite Distribution
        </button>
      </form>
    </div>
  );
}
