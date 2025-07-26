// App.jsx
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
import ProtectedRoute from './components/ProtectedRoute'; // ✅

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/kite-password" element={<KitePassword />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kite-distribution"
          element={
            <ProtectedRoute>
              <KiteForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-schedule"
          element={
            <ProtectedRoute>
              <AddScheduleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-schedules"
          element={
            <ProtectedRoute>
              <ViewSchedules />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
