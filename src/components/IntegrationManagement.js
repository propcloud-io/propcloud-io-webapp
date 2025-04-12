import React, { useState, useEffect } from 'react';
import './IntegrationManagement.css';

const IntegrationManagement = () => {
  const [integrations, setIntegrations] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [status, setStatus] = useState('');
  const [troubleshooting, setTroubleshooting] = useState('');

  useEffect(() => {
    // Fetch integrations from the database
    const fetchIntegrations = async () => {
      try {
        const response = await fetch('/api/integrations');
        const data = await response.json();
        setIntegrations(data);
      } catch (error) {
        console.error('Error fetching integrations:', error);
      }
    };

    fetchIntegrations();
  }, []);

  const handleSelectIntegration = (integration) => {
    setSelectedIntegration(integration);
    setStatus(integration.status);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedIntegration) return;

    try {
      const response = await fetch(`/api/integrations/${selectedIntegration.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      setIntegrations(integrations.map(integration => (integration.id === selectedIntegration.id ? data : integration)));
      setSelectedIntegration(null);
    } catch (error) {
      console.error('Error updating integration status:', error);
    }
  };

  const handleTroubleshoot = async (e) => {
    e.preventDefault();
    if (!selectedIntegration) return;

    try {
      const response = await fetch(`/api/integrations/${selectedIntegration.id}/troubleshoot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ troubleshooting }),
      });
      const data = await response.json();
      setTroubleshooting(data.message);
    } catch (error) {
      console.error('Error troubleshooting integration:', error);
    }
  };

  return (
    <div className="integration-management">
      <h1>Integration Management</h1>
      <div className="integration-list">
        <h2>Integrations</h2>
        <ul>
          {integrations.map((integration) => (
            <li key={integration.id} onClick={() => handleSelectIntegration(integration)}>
              {integration.name} - {integration.status}
            </li>
          ))}
        </ul>
      </div>
      {selectedIntegration && (
        <div className="integration-details">
          <h2>Edit Integration</h2>
          <form onSubmit={handleUpdateStatus}>
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            <button type="submit">Update Status</button>
          </form>
          <form onSubmit={handleTroubleshoot}>
            <label htmlFor="troubleshooting">Troubleshooting:</label>
            <textarea
              id="troubleshooting"
              value={troubleshooting}
              onChange={(e) => setTroubleshooting(e.target.value)}
              required
            />
            <button type="submit">Troubleshoot</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default IntegrationManagement;
