import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './MaintenanceTracking.css';

const MaintenanceTracking = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const requestsRef = firebase.firestore().collection('maintenanceRequests');
        const snapshot = await requestsRef.get();
        const requestsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMaintenanceRequests(requestsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
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

    fetchMaintenanceRequests();
    fetchStaff();
  }, []);

  const assignStaff = async (requestId, staffId) => {
    try {
      const requestRef = firebase.firestore().collection('maintenanceRequests').doc(requestId);
      await requestRef.update({ staffId });
      setMaintenanceRequests(maintenanceRequests.map(request => 
        request.id === requestId ? { ...request, staffId } : request
      ));
    } catch (error) {
      console.error('Error assigning staff:', error);
    }
  };

  const resolveIssue = async (requestId, resolved) => {
    try {
      const requestRef = firebase.firestore().collection('maintenanceRequests').doc(requestId);
      await requestRef.update({ resolved });
      setMaintenanceRequests(maintenanceRequests.map(request => 
        request.id === requestId ? { ...request, resolved } : request
      ));
    } catch (error) {
      console.error('Error resolving issue:', error);
    }
  };

  return (
    <div className="maintenance-tracking">
      <h1>Maintenance Tracking</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Date</th>
              <th>Issue</th>
              <th>Staff</th>
              <th>Resolved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.property}</td>
                <td>{request.date}</td>
                <td>{request.issue}</td>
                <td>
                  <select
                    value={request.staffId || ''}
                    onChange={(e) => assignStaff(request.id, e.target.value)}
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
                    checked={request.resolved || false}
                    onChange={(e) => resolveIssue(request.id, e.target.checked)}
                  />
                </td>
                <td>
                  <button onClick={() => assignStaff(request.id, null)}>Unassign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaintenanceTracking;
