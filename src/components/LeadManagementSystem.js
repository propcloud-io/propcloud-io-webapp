import React, { useState, useEffect } from 'react';
import './LeadManagementSystem.css';

const LeadManagementSystem = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState('');
  const [status, setStatus] = useState('new');

  useEffect(() => {
    // Fetch leads from the database
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads');
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, []);

  const handleAddLead = async (e) => {
    e.preventDefault();
    if (!newLead) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newLead, status }),
      });
      const data = await response.json();
      setLeads([...leads, data]);
      setNewLead('');
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      setLeads(leads.map(lead => (lead.id === id ? data : lead)));
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  return (
    <div className="lead-management-system">
      <h1>Lead Management System</h1>
      <form onSubmit={handleAddLead}>
        <input
          type="email"
          placeholder="Enter lead email"
          value={newLead}
          onChange={(e) => setNewLead(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
        </select>
        <button type="submit">Add Lead</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadManagementSystem;
