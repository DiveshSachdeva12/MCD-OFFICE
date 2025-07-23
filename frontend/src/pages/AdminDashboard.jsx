import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../api/baseUrl';
import AddScheduleForm from './AddScheduleForm';
import ViewSchedules from './ViewSchedules';

export default function AdminDashboard() {
  const [view, setView] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [kites, setKites] = useState([]);
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [editedComplaint, setEditedComplaint] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (view === 'complaints') fetchComplaints();
    else if (view === 'kites') fetchKites();
  }, [view]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/complaints`);
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchKites = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/kites`);
      setKites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComplaint = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this complaint?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/api/complaints/${id}`);
        fetchComplaints();
        Swal.fire('Deleted!', 'The complaint has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Error deleting complaint', 'error');
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await axios.put(`${BASE_URL}/api/complaints/${id}`, { status: newStatus });
      fetchComplaints();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const deleteKite = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this kite record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/api/kites/${id}`);
        fetchKites();
        Swal.fire('Deleted!', 'The kite record has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Error deleting kite record', 'error');
      }
    }
  };

  const handleEditClick = (complaint) => {
    setEditingComplaintId(complaint._id);
    setEditedComplaint({ ...complaint });
  };

  const handleSaveClick = async () => {
    const result = await Swal.fire({
      title: 'Confirm Save',
      text: 'Are you sure you want to save the changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`${BASE_URL}/api/complaints/${editingComplaintId}`, editedComplaint);
        setEditingComplaintId(null);
        fetchComplaints();
        Swal.fire('Saved!', 'The complaint has been updated.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Error saving complaint', 'error');
      }
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Address', 'Complaint', 'Remarks'];
    const rows = complaints.map(c => [c.complaintId, c.name, c.phone, c.address, c.details, c.remarks || '']);
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'complaints.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportKiteCSV = () => {
    const headers = ['Aadhaar', 'Name', 'Number of Kites'];
    const rows = kites.map(k => [k.aadhaar, k.name, k.quantity]);
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'kite_records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredComplaints = complaints.filter(c =>
    Object.values(c).some(value =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <button className="btn btn-primary" onClick={() => setView('complaints')}>Complaint All Data</button>
        <button className="btn btn-success" onClick={() => setView('kites')}>Kite Distribution Record</button>
        <button className="btn btn-warning" onClick={() => setView('addSchedule')}>Add Schedule</button>
        <button className="btn btn-secondary" onClick={() => setView('viewSchedules')}>View Schedules</button>
      </div>

     
            
       
      {view === 'complaints' && (
  <div>
    {/* Complaints View */}
    <div className="d-flex justify-content-between align-items-center">
      <h4>Complaints</h4>
      <button className="btn btn-outline-secondary btn-sm" onClick={exportCSV}>Export CSV</button>
    </div>

    <input
      className="form-control my-3"
      placeholder="Search by ID, phone, name, etc."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />


<div className="table-responsive">

    <table className="table table-bordered mt-2">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Complaint</th>
          <th>Remarks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredComplaints.map((c, index) => (
          <tr
            key={index}
            className={c.status === 'completed' ? 'table-success' : 'table-danger'}
          >
            <td>{c.complaintId}</td>
            <td>
              {editingComplaintId === c._id ? (
                <input value={editedComplaint.name} onChange={e => setEditedComplaint({ ...editedComplaint, name: e.target.value })} />
              ) : c.name}
            </td>
            <td>
              {editingComplaintId === c._id ? (
                <input value={editedComplaint.phone} onChange={e => setEditedComplaint({ ...editedComplaint, phone: e.target.value })} />
              ) : c.phone}
            </td>
            <td>
              {editingComplaintId === c._id ? (
                <input value={editedComplaint.address} onChange={e => setEditedComplaint({ ...editedComplaint, address: e.target.value })} />
              ) : c.address}
            </td>
            <td>
              {editingComplaintId === c._id ? (
                <input value={editedComplaint.details} onChange={e => setEditedComplaint({ ...editedComplaint, details: e.target.value })} />
              ) : c.details}
            </td>
            <td>
              {editingComplaintId === c._id ? (
                <input value={editedComplaint.remarks || ''} onChange={e => setEditedComplaint({ ...editedComplaint, remarks: e.target.value })} />
              ) : c.remarks || ''}
            </td>
            <td>
              <div className="d-flex align-items-center gap-2 flex-nowrap">
                {editingComplaintId === c._id ? (
                  <button className="btn btn-sm btn-success" onClick={handleSaveClick}>Save</button>
                ) : (
                  <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(c)}>Edit</button>
                )}
                <button className="btn btn-sm btn-info" onClick={() => toggleStatus(c._id, c.status)}>Toggle</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteComplaint(c._id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
)}

{view === 'kites' && (
  <div>
    {/* Kite Records View */}
    <div className="d-flex justify-content-between align-items-center">
      <h4>Kite Records</h4>
      <button className="btn btn-outline-secondary btn-sm" onClick={exportKiteCSV}>Export CSV</button>
    </div>
<div className="table-responsive">

    <table className="table table-bordered mt-2">
      <thead className="table-dark">
        <tr>
          <th>Aadhaar</th>
          <th>Name</th>
          <th>Number of Kites</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {kites.map((k, index) => (
          <tr key={index}>
            <td>{k.aadhaar}</td>
            <td>{k.name}</td>
            <td>{k.quantity}</td>
            <td>
              <button className="btn btn-sm btn-danger" onClick={() => deleteKite(k._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
)}

{view === 'addSchedule' && (
  <div>
    <AddScheduleForm />
  </div>
)}

{view === 'viewSchedules' && (
  <div>
    <ViewSchedules />
  </div>
)}

    </div>
  );
}
