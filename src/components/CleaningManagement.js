import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './CleaningManagement.css';

const CleaningManagement = () => {
  const [cleaningSchedule, setCleaningSchedule] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCleaningSchedule = async () => {
      try {
        const scheduleRef = firebase.firestore().collection('cleaningSchedule');
        const snapshot = await scheduleRef.get();
        const scheduleList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCleaningSchedule(scheduleList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cleaning schedule:', error);
        setLoading(false);
      }
    };

    const fetchStaff = async () => {
      try {
        const staffRef = firebase.firestore().collection('staff');
        const snapshot = await staffRef.get();
        const staffList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStaff(staffList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff:', error);
        setLoading(false);
      }
    };

    fetchCleaningSchedule();
    fetchStaff();
  }, []);

  const assignStaff = async (scheduleId, staffId) => {
    try {
      const scheduleRef = firebase.firestore().collection('cleaningSchedule').doc(scheduleId);
      await scheduleRef.update({ staffId });
      setCleaningSchedule(cleaningSchedule.map(schedule => 
        schedule.id === scheduleId ? { ...schedule, staffId } : schedule
      ));
    } catch (error) {
      console.error('Error assigning staff:', error);
    }
  };

  const verifyQuality = async (scheduleId, qualityVerified) => {
    try {
      const scheduleRef = firebase.firestore().collection('cleaningSchedule').doc(scheduleId);
      await scheduleRef.update({ qualityVerified });
      setCleaningSchedule(cleaningSchedule.map(schedule => 
        schedule.id === scheduleId ? { ...schedule, qualityVerified } : schedule
      ));
    } catch (error) {
      console.error('Error verifying quality:', error);
    }
  };

  return (
    <div className="cleaning-management">
      <h1>Cleaning Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Date</th>
              <th>Staff</th>
              <th>Quality Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cleaningSchedule.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.property}</td>
                <td>{schedule.date}</td>
                <td>
                  <select
                    value={schedule.staffId || ''}
                    onChange={(e) => assignStaff(schedule.id, e.target.value)}
                  >
                    <option value="">Select Staff</option>
                    {staff.map((staffMember) => (
                      <option key={staffMember.id} value={staffMember.id}>
                        {staffMember.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={schedule.qualityVerified || false}
                    onChange={(e) => verifyQuality(schedule.id, e.target.checked)}
                  />
                </td>
                <td>
                  <button onClick={() => assignStaff(schedule.id, null)}>Unassign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CleaningManagement;
