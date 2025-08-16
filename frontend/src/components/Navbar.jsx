import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

export default function Navbar() {
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNavItemClick = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  };

  return (
    <>
      {/* ===== Top Header ===== */}
      <div className="top-header d-flex justify-content-between align-items-center px-3 py-1 bg-white border-bottom small-text">
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '14px' }}>
          दिल्ली नगर निगम | MUNICIPAL CORPORATION OF DELHI
        </div>
        {/* Timer */}
        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
          {time.toLocaleTimeString('en-IN', { hour12: true })}
        </div>
      </div>

      {/* ===== Logo + Headings + Helpline ===== */}
      <div className="container-fluid py-2 bg-light border-bottom">
        <div className="row align-items-center">
          {/* Logo + Titles */}
          <div className="col-12 col-md-9 d-md-flex align-items-center">
            <div className="text-center text-md-start mb-2 mb-md-0 me-md-3">
              <img src="/mcd.jpg" alt="MCD Logo" style={{ height: '100px' }} />
            </div>

            <div className="text-center text-md-start w-100">
              {/* Desktop View */}
              <div className="d-none d-md-block">
                <h6 className="mb-1 fw-bold text-uppercase fs-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  MCD – MUNICIPAL CORPORATION OF DELHI
                </h6>
                <h6 className="mb-1 fw-bold text-uppercase fs-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  पंकज लुथरा
                </h6>
                <h6 className="mb-0 fw-bold text-uppercase fs-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  निगम पार्षद पंकज लूथरा झिलमिल वार्ड 216
                </h6>
              </div>

              {/* Mobile View */}
              <div className="d-md-none">
                <h6 className="mb-1 fw-bold text-uppercase fs-6 text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  MCD – MUNICIPAL CORPORATION OF DELHI
                </h6>
                <h6 className="mb-1 fw-bold text-uppercase fs-6 text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  पंकज लुथरा
                </h6>
                <h6 className="mb-0 fw-bold text-uppercase fs-6 text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  निगम पार्षद पंकज लूथरा झिलमिल वार्ड 216
                </h6>
              </div>
            </div>
          </div>

          {/* Flag + Helpline */}
          <div className="col-12 col-md-3 text-center text-md-end mt-2 mt-md-0 d-none d-md-block">
            <div className="d-flex flex-column align-items-center align-items-md-end">
              <img src="/flag.jpg" alt="India Flag" style={{ height: '45px', marginBottom: '5px' }} />
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>HELPLINE:</span>
              <span className="fw-bold text-primary" style={{ fontSize: '14px' }}>8700115912</span>
              <span className="fw-bold text-primary" style={{ fontSize: '14px' }}>9311981939</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-2 py-2 shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-white text-uppercase" to="/" onClick={handleNavItemClick}>
            MCD PORTAL
          </Link>

          {/* Toggle Button */}
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

          {/* Nav Items */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold text-uppercase" to="/" onClick={handleNavItemClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold text-uppercase" to="/about" onClick={handleNavItemClick}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold text-uppercase" to="/complaint" onClick={handleNavItemClick}>
                  Complaint Form
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold text-uppercase" to="/gallery" onClick={handleNavItemClick}>
                  Gallery
                </Link>
              </li>
            </ul>

            {/* Admin Button */}
            <div className="d-flex gap-2 mt-2 mt-lg-0">
              <Link
                to="/admin-login"
                className="btn btn-danger btn-sm text-uppercase fw-bold"
                onClick={handleNavItemClick}
              >
                Admin Department
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
