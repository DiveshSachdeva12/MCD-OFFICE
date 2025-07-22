import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

export default function Navbar() {
  return (
    <>
      {/* Top Header */}
      <div className="top-header d-flex justify-content-between align-items-center px-3 py-1 bg-white border-bottom small-text">
        <div style={{ fontFamily: "'Oswald', sans-serif" }}>
          दिल्ली नगर निगम &nbsp; | &nbsp; MUNICIPAL CORPORATION OF DELHI
        </div>
        <div className="d-flex align-items-center gap-3">
          <div>SCREEN READER ACCESS</div>
        </div>
      </div>

      {/* Logo + Heading Section */}
      <div className="d-flex align-items-start justify-content-start px-4 py-3 bg-light border-bottom flex-wrap gap-4">
        {/* Logo */}
        <div>
          <img src="/mcd.jpg" alt="MCD Logo" style={{ height: '80px' }} />
        </div>

        {/* Heading in 3 lines */}
        <div style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', color: '#333' }}>
          <h5 className="mb-1 fw-bold" style={{ fontSize: '1.6rem', letterSpacing: '1px', lineHeight: '1.4' }}>
            MCD – MUNICIPAL CORPORATION OF DELHI
          </h5>
          <h5 className="mb-1 fw-bold" style={{ fontSize: '1.8rem', letterSpacing: '1px', lineHeight: '1.4' }}>
            पंकज लुथरा
          </h5>
          <h5 className="mb-0 fw-bold" style={{ fontSize: '1.4rem', letterSpacing: '1px', lineHeight: '1.4' }}>
            निगम पार्षद पंकज लूथरा  झिलमिल वार्ड 216

          </h5>
        </div>

        {/* Helpline with Indian Flag */}
        {/* Helpline with Indian Flag */}
{/* Flag + Helpline Section */}
<div className="ms-auto d-flex align-items-center flex-column flex-lg-row text-uppercase text-center text-lg-start gap-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
  <img src="/flag.jpg" alt="India Flag" className="mx-auto mx-lg-0 flag" style={{ height: '55px' }} />
  <div className="d-flex flex-column">
    <span className="text-muted fw-semibold">HELPLINE:</span>
    <span className="fw-bold text-primary">8700115912</span>
    <span className="fw-bold text-primary">9311981939</span>
  </div>
</div>

      </div>

      {/* Responsive Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar px-3 navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand text-white fw-bold text-uppercase" to="/">MCD PORTAL</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold text-uppercase" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold text-uppercase" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold text-uppercase" to="/complaint">Complaint Form</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold text-uppercase" to="/kite-password">Kite Distribution</Link>
              </li>
              <li className="nav-item">
  <Link className="nav-link text-white fw-bold text-uppercase" to="/gallery">Gallery</Link>
</li>

            </ul>

            <div className="d-flex gap-2 mt-2 mt-lg-0">
<Link to="/admin-login" className="btn btn-danger btn-sm text-uppercase fw-bold">Admin Department</Link>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
