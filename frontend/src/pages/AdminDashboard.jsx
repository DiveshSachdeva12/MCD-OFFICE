import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../api/baseUrl';
import AddScheduleForm from './AddScheduleForm';
import ViewSchedules from './ViewSchedules';
import KiteForm from './KiteForm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit, faTrash, faSave, faCopy, faSync,
  faFileCsv, faFilePdf
} from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboard() {
  const [view, setView] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [kites, setKites] = useState([]);
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [editedComplaint, setEditedComplaint] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (view === 'complaints') fetchComplaints();
    if (view === 'kites') fetchKites();
  }, [view]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/complaints`);
      setComplaints(res.data);
    } catch {
      Swal.fire('Error', 'Failed to fetch complaints', 'error');
    }
  };

  const fetchKites = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/kites`);
      setKites(res.data);
    } catch {
      Swal.fire('Error', 'Failed to fetch kite records', 'error');
    }
  };

  const deleteComplaint = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this complaint?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/api/complaints/${id}`);
        fetchComplaints();
        Swal.fire('Deleted!', 'Complaint has been deleted.', 'success');
      } catch {
        Swal.fire('Error', 'Error deleting complaint', 'error');
      }
    }
  };

  const handleEditClick = (complaint) => {
    setEditingComplaintId(complaint._id);
    setEditedComplaint({ ...complaint });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${BASE_URL}/api/complaints/${editingComplaintId}`, editedComplaint);
      setEditingComplaintId(null);
      fetchComplaints();
      Swal.fire('Saved!', 'Complaint updated.', 'success');
    } catch {
      Swal.fire('Error', 'Error saving complaint', 'error');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await axios.put(`${BASE_URL}/api/complaints/${id}`, { status: newStatus });
      fetchComplaints();
    } catch {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const deleteKite = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/api/kites/${id}`);
        fetchKites();
        Swal.fire('Deleted', 'Kite record deleted', 'success');
      } catch {
        Swal.fire('Error', 'Failed to delete', 'error');
      }
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Address', 'Department', 'Complaint', 'Remarks'];
    const rows = complaints.map(c => [
      c.complaintId, c.name, c.phone, c.address, c.department || '', c.details, c.remarks || ''
    ]);
    let csv = headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'complaints.csv';
    link.click();
  };

  const exportPDF = () => {
    const input = document.getElementById('complaint-table');
    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(img, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('complaints.pdf');
    });
  };

  const exportKitesToCSV = () => {
    const headers = ['Aadhaar', 'Name', 'Number of Kites'];
    const rows = kites.map(k => [k.aadhaar, k.name, k.quantity]);
    const csv = headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'kite-distribution.csv';
    link.click();
  };

  const exportKitesToPDF = () => {
    const input = document.getElementById('kite-table');
    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(img, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('kite-distribution.pdf');
    });
  };

  const filteredComplaints = complaints.filter(c =>
    Object.values(c).some(value =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
        <button className="btn btn-primary" onClick={() => setView('complaints')}>Complaint All Data</button>
        <button className="btn btn-danger" onClick={() => setView('kitePanel')}>Kite Distribution Panel</button>
        <button className="btn btn-success" onClick={() => setView('kites')}>Kite Record</button>
        <button className="btn btn-warning" onClick={() => setView('addSchedule')}>Add Schedule</button>
        <button className="btn btn-secondary" onClick={() => setView('viewSchedules')}>View Schedules</button>
      </div>

      {view === 'complaints' && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Complaints</h4>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={exportCSV}>
                <FontAwesomeIcon icon={faFileCsv} /> CSV
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={exportPDF}>
                <FontAwesomeIcon icon={faFilePdf} /> PDF
              </button>
            </div>
          </div>

          <input
            className="form-control my-3"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <div className="table-responsive" id="complaint-table">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th><th>Name</th><th>Phone</th><th>Address</th>
                  <th>Department</th><th>Complaint</th><th>Remarks</th><th>Actions</th>
                </tr>
              </thead>
             <tbody>
  {filteredComplaints.map((c, idx) => (
    <tr key={idx} className={c.status === 'completed' ? 'table-success' : 'table-danger'}>
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
          <input value={editedComplaint.department} onChange={e => setEditedComplaint({ ...editedComplaint, department: e.target.value })} />
        ) : c.department}
      </td>
      <td>
        {editingComplaintId === c._id ? (
          <input value={editedComplaint.details} onChange={e => setEditedComplaint({ ...editedComplaint, details: e.target.value })} />
        ) : c.details}
      </td>
      <td>
        {editingComplaintId === c._id ? (
          <input value={editedComplaint.remarks} onChange={e => setEditedComplaint({ ...editedComplaint, remarks: e.target.value })} />
        ) : c.remarks}
      </td>
      <td>
        {editingComplaintId === c._id ? (
          <button className="btn btn-sm btn-success" onClick={handleSaveClick}>
            <FontAwesomeIcon icon={faSave} />
          </button>
        ) : (
          <button className="btn btn-sm btn-warning me-1" onClick={() => handleEditClick(c)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        <button className="btn btn-sm btn-danger me-1" onClick={() => deleteComplaint(c._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="btn btn-sm btn-info me-1" onClick={() => toggleStatus(c._id, c.status)}>
          <FontAwesomeIcon icon={faSync} />
        </button>
        <button
          className="btn btn-sm btn-dark"
          onClick={() => {
            const copyText = `complaintId: ${c.complaintId},\nname: ${c.name},\nphone: ${c.phone},\naddress: ${c.address},\ndepartment: ${c.department},\ndetails: ${c.details}`;
            navigator.clipboard.writeText(copyText).then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Copied!',
                text: 'Complaint details copied to clipboard',
                timer: 1500,
                showConfirmButton: false
              });
            });
          }}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </>
      )}

      {view === 'kitePanel' && <KiteForm />}

      {view === 'kites' && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Kite Distribution Records</h4>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={exportKitesToCSV}>
                <FontAwesomeIcon icon={faFileCsv} /> CSV
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={exportKitesToPDF}>
                <FontAwesomeIcon icon={faFilePdf} /> PDF
              </button>
            </div>
          </div>
          <div className="table-responsive mt-3" id="kite-table">
            <table className="table table-bordered">
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
                      <button className="btn btn-sm btn-danger" onClick={() => deleteKite(k._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {view === 'addSchedule' && <AddScheduleForm />}
      {view === 'viewSchedules' && <ViewSchedules />}
    </div>
  );
}
