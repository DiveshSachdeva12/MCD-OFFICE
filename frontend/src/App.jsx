import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ComplaintForm from './pages/ComplaintForm';
import KiteForm from './pages/KiteForm';

import KitePassword from './pages/KitePassword';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import AddScheduleForm from './pages/AddScheduleForm';
import ViewSchedules from './pages/ViewSchedules';
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/kite-distribution" element={<KiteForm />} />
       <Route path="/gallery" element={<Gallery />} />
  <Route path="/add-schedule" element={<AddScheduleForm />} />
  <Route path="/view-schedules" element={<ViewSchedules />} />
        <Route path="/kite-password" element={<KitePassword />} />
      </Routes>
    </>
  );
}
