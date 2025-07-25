import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function KitePassword() {
  const navigate = useNavigate();

  const handleAccess = () => {
    navigate('/kite-distribution');
  };

  return (
    <div className="container mt-5 text-center">
      <button className="btn btn-success btn-lg" onClick={handleAccess}>
        Go to Kite Distribution
      </button>
    </div>
  );
}
