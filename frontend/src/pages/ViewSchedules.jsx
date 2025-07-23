import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/baseUrl';
import Swal from 'sweetalert2';

export default function ViewSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    programName: '',
    date: '',
    time: '',
    venue: '',
    contactPerson: '',
    contactNumber: '',
    description: ''
  });

  const fetchSchedules = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/schedules`);
      setSchedules(res.data);
    } catch (err) {
      console.error('Error fetching schedules', err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this schedule?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/api/schedules/${id}`);
        Swal.fire('Deleted!', 'Schedule has been deleted.', 'success');
        fetchSchedules();
      } catch (err) {
        console.error('Delete error', err);
        Swal.fire('Error', 'Failed to delete schedule.', 'error');
      }
    }
  };

  const handleEditClick = (schedule) => {
    // Convert time to 24-hour format
    let formattedTime = '';
    try {
      const timeParts = schedule.time.match(/(\d+):(\d+)\s?(AM|PM)/i);
      if (timeParts) {
        let hour = parseInt(timeParts[1], 10);
        const minute = timeParts[2];
        const period = timeParts[3].toUpperCase();

        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;

        formattedTime = `${hour.toString().padStart(2, '0')}:${minute}`;
      } else {
        console.warn("Time format not matched:", schedule.time);
        formattedTime = '00:00'; // fallback
      }
    } catch (error) {
      console.error('Error parsing time', error);
      formattedTime = '00:00';
    }

    setEditId(schedule._id);
    setEditForm({ ...schedule, time: formattedTime });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveEdit = async () => {
  try {
    console.log("Saving edit for ID:", editId);
    console.log("Data:", editForm);
    const res = await axios.put(`${BASE_URL}/api/schedules/${editId}`, editForm);
    console.log("Updated response:", res.data);
    Swal.fire('Updated!', 'Schedule updated successfully.', 'success');
    setEditId(null);
    fetchSchedules();
  } catch (err) {
    console.error('Update error', err.response?.data || err.message);
    Swal.fire('Error', 'Failed to update schedule.', 'error');
  }
};


  const handleCancelEdit = () => {
    setEditId(null);
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hourStr, minute] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

 const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};

  const filteredSchedules = schedules.filter((s) =>
    s.date.includes(search)
  );

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">📅 View Program Schedules</h5>

          <div className="mb-4">
            <label className="form-label">🔍 Search by Date (DD-MM-YYYY):</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., 16-05-2025"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-dark sticky-top">
                <tr>
                  <th>Program Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                  <th>Contact Person</th>
                  <th>Contact Number</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">No schedules found.</td>
                  </tr>
                ) : (
                  filteredSchedules.map((s) =>
                    editId === s._id ? (
                      <tr key={s._id}>
                        <td><input type="text" name="programName" value={editForm.programName} onChange={handleInputChange} className="form-control" /></td>
                        <td><input type="date" name="date" value={editForm.date} onChange={handleInputChange} className="form-control" /></td>
                        <td><input type="time" name="time" value={editForm.time} onChange={handleInputChange} className="form-control" /></td>
                        <td><input type="text" name="venue" value={editForm.venue} onChange={handleInputChange} className="form-control" /></td>
                        <td><input type="text" name="contactPerson" value={editForm.contactPerson} onChange={handleInputChange} className="form-control" /></td>
                        <td><input type="text" name="contactNumber" value={editForm.contactNumber} onChange={handleInputChange} className="form-control" /></td>
                        <td><textarea name="description" value={editForm.description} onChange={handleInputChange} className="form-control" /></td>
                        <td>
                          <div className="d-flex flex-column gap-2">
                            <button className="btn btn-sm btn-success" onClick={handleSaveEdit}>Save</button>
                            <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={s._id}>
                        <td>{s.programName?.toUpperCase()}</td>
                        <td>{formatDate(s.date)}</td>
                        <td>{formatTime(s.time)}</td>
                        <td>{s.venue?.toUpperCase()}</td>
                        <td>{s.contactPerson?.toUpperCase()}</td>
                        <td>{s.contactNumber}</td>
                        <td style={{ whiteSpace: 'pre-wrap', maxWidth: '250px' }}>{s.description?.toUpperCase()}</td>
                        <td>
                          <div className="d-flex flex-column gap-2">
                            <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(s)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
