import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function KitePassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123') {
      Swal.fire({
        icon: 'success',
        title: 'Access Granted',
        text: 'Welcome to Kite Distribution!',
        timer: 1500,
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
    <div className="container mt-5">
      <h4>🔒 ENTER PASSWORD TO ACCESS KITE DISTRIBUTION</h4>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="password"
          placeholder="Enter password..."
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}
