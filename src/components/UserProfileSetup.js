import React, { useState } from 'react';
import './UserProfileSetup.css';

const UserProfileSetup = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [properties, setProperties] = useState('');
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save user profile information
  };

  return (
    <div className="user-profile-setup">
      <h2>Set Up Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </label>
        <label>
          Number of Properties:
          <input
            type="number"
            value={properties}
            onChange={(e) => setProperties(e.target.value)}
            required
          />
        </label>
        <label>
          Notifications:
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                notifications: e.target.checked,
              })
            }
          />
        </label>
        <label>
          Dark Mode:
          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                darkMode: e.target.checked,
              })
            }
          />
        </label>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfileSetup;
