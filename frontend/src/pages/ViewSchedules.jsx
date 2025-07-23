// components/ViewSchedules.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/baseUrl';

export default function ViewSchedules() {
  const [schedules, setSchedules] = useState([]);

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

  return (
    <div className="card p-4 mt-4">
      <h5>View Program Schedules</h5>
      <table className="table table-bordered mt-2">
        <thead className="table-dark">
          <tr>
            <th>Program Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Contact Person</th>
            <th>Contact Number</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s, i) => (
            <tr key={i}>
              <td>{s.programName}</td>
              <td>{s.date}</td>
              <td>{s.time}</td>
              <td>{s.venue}</td>
              <td>{s.contactPerson}</td>
              <td>{s.contactNumber}</td>
              <td>{s.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
