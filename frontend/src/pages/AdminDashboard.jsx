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
import * as XLSX from 'xlsx';
import "jspdf-autotable";


export default function AdminDashboard() {
  const [view, setView] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [kites, setKites] = useState([]);
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [editedComplaint, setEditedComplaint] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [aadhaarData, setAadhaarData] = useState([]);

  const [aadhaarSearch, setAadhaarSearch] = useState('');
  const [pensionSearch, setPensionSearch] = useState('');
  const [voterSearch, setVoterSearch] = useState('');
  const [editedAadhaarData, setEditedAadhaarData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  // At the top of AdminDashboard.jsx
  const [pensionData, setPensionData] = useState([]);
  const [voterIdData, setVoterIdData] = useState([]);

  // For modals
  const [showPensionEditModal, setShowPensionEditModal] = useState(false);
  const [showVoterEditModal, setShowVoterEditModal] = useState(false);

  // Form data
  const [pensionFormData, setPensionFormData] = useState({ _id: '', name: '', age: '', bank: '' });
  const [voterFormData, setVoterFormData] = useState({ _id: '', fullName: '', mobile: '', applicationNo: '', voterCardNo: '' });


  useEffect(() => {
    if (view === 'complaints') fetchComplaints();
    if (view === 'kites') fetchKites();
    if (view === 'aadhaar') fetchAadhaar();
    if (view === 'pension') fetchPension();
    if (view === 'voterid') fetchVoterId();

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
  const headers = ['S.No', 'Aadhaar', 'Name', 'Phone Number', 'Number of Kites', 'Date'];

  const rows = kites.map((k, index) => [
    index + 1, // S.No
    k.aadhaar,
    k.name,
    k.phone || '',
    k.quantity,
    k.date
      ? new Date(k.date).toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      : 'N/A'
  ]);

  const csv =
    headers.join(',') +
    '\n' +
    rows.map(r =>
      r
        .map(val => `"${val}"`) // wrap each value in quotes so commas don’t break CSV
        .join(',')
    ).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'kite-distribution.csv';
  link.click();
};

const exportKitesToPDF = () => {
  if (!kites || kites.length === 0) {
    alert("No data to export!");
    return;
  }

  const doc = new jsPDF("l", "mm", "a4");

  // Title
  doc.setFontSize(16);
  doc.text("Kite Distribution Records", 14, 15);

  // Table data
  const headers = [["S.No", "Aadhaar", "Name", "Number of Kites", "Date"]];
  const rows = kites.map((k, index) => [
    index + 1,
    k.aadhaar,
    k.name,
    k.quantity,
    k.date
      ? new Date(k.date).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "N/A",
  ]);

  // Generate table
  doc.autoTable({
    head: headers,
    body: rows,
    startY: 25,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  doc.save("kite-distribution.pdf");
};



  const filteredComplaints = complaints.filter(c =>
    Object.values(c).some(value =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const fetchAadhaar = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/aadhaar`);
      setAadhaarData(data);
    } catch {
      Swal.fire('Error', 'Failed to fetch Aadhaar', 'error');
    }
  };


  const fetchPension = async () => {
    try { const { data } = await axios.get(`${BASE_URL}/api/pension`); setPensionData(data); }
    catch { Swal.fire('Error', 'Failed to fetch Pension', 'error'); }
  };

  const fetchVoterId = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/voterid`);
      setVoterIdData(data); // or whatever your setter is
    } catch (error) {
      console.error('Error fetching voter ID data:', error);
      Swal.fire('Error', 'Failed to fetch Voter ID data', 'error');
    }
  };

  const exportTablePDF = async (elementId, title) => {
    const el = document.getElementById(elementId);
    if (!el) return Swal.fire('Error', 'Table not found', 'error');
    const canvas = await html2canvas(el);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4');
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 10, w, h);
    pdf.save(`${title}.pdf`);
  };
  
  const exportTableExcel = (headers, rows, filename = 'data') => {
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const handleDeleteAadhaar = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Aadhaar record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/api/aadhaar/${id}`);
        Swal.fire('Deleted!', 'Aadhaar record has been deleted.', 'success');
        fetchAadhaar(); // ✅ Use this, NOT fetchAadhaarData
      } catch (err) {
        Swal.fire('Error', 'Failed to delete Aadhaar record', 'error');
      }
    }
  };

  const handleEditAadhaar = (aadhaarItem) => {
    setEditedAadhaarData(aadhaarItem);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAadhaarData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEditedAadhaar = async () => {
    try {
      await axios.put(`${BASE_URL}/api/aadhaar/byNumber/${editedAadhaarData.aadhaarNumber}`, editedAadhaarData);


      Swal.fire('Success', 'Aadhaar record updated.', 'success');
      setShowEditModal(false);
      fetchAadhaar(); // Refresh list
    } catch (err) {
      Swal.fire('Error', 'Failed to update record', 'error');
    }
  };
  const handleEditPension = (pensionItem) => {
    Swal.fire('Edit Clicked', `Coming Soon: ${pensionItem.fullName}`, 'info');
  };


  const handleEditVoter = (voterItem) => {
    Swal.fire('Edit Clicked', `Coming Soon: ${voterItem.fullName}`, 'info');
  };



  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
        <button className="btn btn-primary" onClick={() => setView('complaints')}>Complaint All Data</button>
        <button className="btn btn-danger" onClick={() => setView('kitePanel')}>Kite Distribution Panel</button>
        <button className="btn btn-success" onClick={() => setView('kites')}>Kite Record</button>
        <button className="btn btn-warning" onClick={() => setView('addSchedule')}>Add Schedule</button>
        <button className="btn btn-secondary" onClick={() => setView('viewSchedules')}>View Schedules</button>
        <button className="btn btn-primary me-2" onClick={() => setView('aadhaar')}>
          Aadhaar Card Details
        </button>

        <button className="btn btn-success me-2" onClick={() => setView('pension')}>
          Pension Details
        </button>

        <button className="btn btn-warning" onClick={() => setView('voterid')}>
          Voter ID Details
        </button>

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

  <div className="table-responsive shadow rounded-3">
  <table className="table table-hover table-striped table-bordered align-middle">
    <thead className="table-dark text-center">
      <tr>
        <th>S.No</th>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Department</th>
        <th>Complaint</th>
        <th>Remarks</th>
        <th>Date & Time</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody className="text-center">
      {filteredComplaints.map((c, idx) => (
        <tr
          key={idx}
          className={c.status === 'completed' ? 'table-success' : 'table-danger'}
        >
          {/* ✅ Serial Number */}
          <td><strong>{idx + 1}</strong></td>

          <td>{c.complaintId}</td>
          <td>
            {editingComplaintId === c._id ? (
              <input
                className="form-control form-control-sm"
                value={editedComplaint.name}
                onChange={e =>
                  setEditedComplaint({ ...editedComplaint, name: e.target.value })
                }
              />
            ) : (
              c.name
            )}
          </td>
          <td>
            {editingComplaintId === c._id ? (
              <input
                className="form-control form-control-sm"
                value={editedComplaint.phone}
                onChange={e =>
                  setEditedComplaint({ ...editedComplaint, phone: e.target.value })
                }
              />
            ) : (
              c.phone
            )}
          </td>
          <td>
            {editingComplaintId === c._id ? (
              <input
                className="form-control form-control-sm"
                value={editedComplaint.address}
                onChange={e =>
                  setEditedComplaint({ ...editedComplaint, address: e.target.value })
                }
              />
            ) : (
              c.address
            )}
          </td>
          <td>
            {editingComplaintId === c._id ? (
              <input
                className="form-control form-control-sm"
                value={editedComplaint.department}
                onChange={e =>
                  setEditedComplaint({
                    ...editedComplaint,
                    department: e.target.value,
                  })
                }
              />
            ) : (
              c.department
            )}
          </td>
          <td>
            {editingComplaintId === c._id ? (
              <input
                className="form-control form-control-sm"
                value={editedComplaint.details}
                onChange={e =>
                  setEditedComplaint({
                    ...editedComplaint,
                    details: e.target.value,
                  })
                }
              />
            ) : (
              c.details
            )}
          </td>

          {/* ✅ Auto Remarks Column */}
          <td>
            {c.status === 'completed' ? (
              <span className="badge bg-success">Completed</span>
            ) : (
              <span className="badge bg-danger">Pending</span>
            )}
          </td>

          {/* ✅ Complaint Date & Time */}
          <td>
            <span className="badge bg-secondary">
              {new Date(c.createdAt).toLocaleString('en-IN', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </span>
          </td>

          {/* ✅ Actions */}
          <td className="d-flex justify-content-center">
            {editingComplaintId === c._id ? (
              <button className="btn btn-sm btn-success me-1" onClick={handleSaveClick}>
                <FontAwesomeIcon icon={faSave} />
              </button>
            ) : (
              <button
                className="btn btn-sm btn-warning me-1"
                onClick={() => handleEditClick(c)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            <button
              className="btn btn-sm btn-info me-1"
              onClick={() => toggleStatus(c._id, c.status)}
            >
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
                    showConfirmButton: false,
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
    <th>S.No</th>
    <th>Aadhaar</th>
    <th>Name</th>
    <th>Number of Kites</th>
    <th>Date</th>
  </tr>
</thead>
<tbody>
  {kites.map((k, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{k.aadhaar}</td>
      <td>{k.name}</td>
      <td>{k.quantity}</td>
      <td>
        {k.date
          ? new Date(k.date).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            })
          : 'N/A'}
      </td>
       {/* <td>
                <button className="btn btn-sm btn-danger" onClick={() => deleteKite(k._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td> */}
    </tr>
  ))}
</tbody>
 

      </table>
    </div>
  </>
)}

      {view === 'aadhaar' && (

        <>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Aadhaar Card Records</h4>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search by name, Aadhaar number or mobile..."
              value={aadhaarSearch}
              onChange={(e) => setAadhaarSearch(e.target.value)}
            />


            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() =>
                  exportTableExcel(
                    ['Name', 'Aadhaar Number', 'Date of Birth', 'Mobile', 'Address'],
                    aadhaarData.map(a => [
                      a.fullName || '',
                      a.aadhaarNumber || '',
                      a.dob || '',
                      a.mobile || '',
                      a.address || ''
                    ]),
                    'aadhaar-data'
                  )
                }
              >
                <FontAwesomeIcon icon={faFileCsv} /> Excel
              </button>

              <button className="btn btn-sm btn-outline-danger" onClick={() =>
                exportTablePDF('aadhaar-table', 'aadhaar-data')
              }>
                <FontAwesomeIcon icon={faFilePdf} /> PDF
              </button>
            </div>
          </div>
          <div className="table-responsive mt-3" id="aadhaar-table">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>S.NO</th><th>NAME</th><th>ADDRESS</th><th>ADHAAR NUMBER</th><th>PHONE NO </th><th>DOB</th><th>ADDRESS CHANGE </th>
                  <th>ACTION</th>

                </tr>
              </thead>
              <tbody>
                {aadhaarData
                  .filter((item) =>
                    item.fullName.toLowerCase().includes(aadhaarSearch.toLowerCase()) ||
                    item.aadhaarNumber.includes(aadhaarSearch) ||
                    item.mobile.includes(aadhaarSearch)
                  )
                  .map((a, index) => (
                    <tr key={a._id}>
                      <td>{index + 1}</td>
                      <td>{a.fullName}</td>
                      <td>{a.address}</td>
                      <td>{a.aadhaarNumber}</td>
                      <td>{a.mobile}</td>
                      <td>{a.dob}</td>
                      <td>{a.addressChange}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditAadhaar(a)}
                        >
                          Edit
                        </button>


                        {/* <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteAadhaar(a._id)}
                        >
                          Delete
                        </button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>


            </table>
          </div>
        </>
      )}

      {view === 'pension' && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Pension Records</h4>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search by Name, Registration No., or Mobile"
              value={pensionSearch}
              onChange={(e) => setPensionSearch(e.target.value)}
            />

            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() =>
                  exportTableExcel(
                    ['FULL NAME', 'REGISTRATION NO', 'PASSWORD', 'MOBILE', 'APPLICATION NO'],
                    pensionData.map(p => [
                      p.fullName || '',
                      p.registrationNo || '',
                      p.password || '',
                      p.mobile || '',
                      p.applicationNo || ''
                    ]),
                    'pension-data'
                  )
                }
              >
                <FontAwesomeIcon icon={faFileCsv} /> Excel
              </button>

              <button className="btn btn-sm btn-outline-danger" onClick={() =>
                exportTablePDF('pension-table', 'pension-data')
              }>
                <FontAwesomeIcon icon={faFilePdf} /> PDF
              </button>
            </div>
          </div>
          <div className="table-responsive mt-3" id="pension-table">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>FULL NAME </th><th>REGISTRATION NO </th><th>PASSWORD</th><th>MOBILE</th><th>APPLICATION NO </th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pensionData
                  .filter((p) =>
                    p.fullName.toLowerCase().includes(pensionSearch.toLowerCase()) ||
                    p.registrationNo.includes(pensionSearch) ||
                    p.mobile.includes(pensionSearch)
                  )
                  .map((p, index) => (
                    <tr key={p._id}>
                      <td>{p.fullName}</td>
                      <td>{p.registrationNo}</td>
                      <td>{p.password}</td>
                      <td>{p.mobile}</td>
                      <td>{p.applicationNo}</td>
                      <td>
                        <button className="btn btn-sm btn-warning" onClick={() => handleEditPension(p)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>


            </table>
          </div>
        </>
      )}

      {view === 'voterid' && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Voter ID Records</h4>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search by Name, Mobile or Voter Card No."
              value={voterSearch}
              onChange={(e) => setVoterSearch(e.target.value)}
            />

            <div>
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={() =>
                  exportTableExcel(
                    ['FULL NAME ', 'MOBILE', 'APPLICATION NO ', 'VOTER CARD NO'],
                    voterIdData.map(v => [
                      v.fullName || '',
                      v.mobile || '',
                      v.applicationNo || '',
                      v.voterCardNo || ''
                    ]),
                    'voter-id-data'
                  )
                }
              >
                <FontAwesomeIcon icon={faFileCsv} /> Export Excel
              </button>

              <button className="btn btn-sm btn-outline-danger" onClick={() =>
                exportTablePDF('voterid-table', 'voterid-data')
              }>
                <FontAwesomeIcon icon={faFilePdf} /> PDF
              </button>
            </div>
          </div>
          <div className="table-responsive mt-3" id="voterid-table">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>FULL NAME </th><th>MOBILE</th><th>APPLICATION NO</th><th>VOTER CARD NO</th><th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {voterIdData
                  .filter((v) =>
                    v.fullName.toLowerCase().includes(voterSearch.toLowerCase()) ||
                    v.voterCardNo.includes(voterSearch) ||
                    v.mobile.includes(voterSearch)
                  )
                  .map((v, index) => (
                    <tr key={v._id}>
                      <td>{v.fullName}</td>
                      <td>{v.mobile}</td>
                      <td>{v.applicationNo}</td>
                      <td>{v.voterCardNo}</td>
                      <td>
                        <button className="btn btn-sm btn-warning" onClick={() => handleEditVoter(v)}>
                          Edit
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

      {showEditModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Aadhaar Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  name="fullName"
                  value={editedAadhaarData.fullName || ''}
                  onChange={handleEditInputChange}
                  placeholder="Full Name"
                />
                <input
                  className="form-control mb-2"
                  name="address"
                  value={editedAadhaarData.address || ''}
                  onChange={handleEditInputChange}
                  placeholder="Address"
                />
                <input
                  className="form-control mb-2"
                  name="aadhaarNumber"
                  value={editedAadhaarData.aadhaarNumber || ''}
                  onChange={handleEditInputChange}
                  placeholder="Aadhaar Number"
                />
                <input
                  className="form-control mb-2"
                  name="mobile"
                  value={editedAadhaarData.mobile || ''}
                  onChange={handleEditInputChange}
                  placeholder="Mobile"
                />
                <input
                  className="form-control mb-2"
                  name="dob"
                  value={editedAadhaarData.dob || ''}
                  onChange={handleEditInputChange}
                  placeholder="Date of Birth"
                />
                <input
                  className="form-control mb-2"
                  name="addressChange"
                  value={editedAadhaarData.addressChange || ''}
                  onChange={handleEditInputChange}
                  placeholder="Address Change Request"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSaveEditedAadhaar}>
                  Save Changes
                </button>
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}
