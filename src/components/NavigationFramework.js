import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationFramework.css';

const NavigationFramework = ({ userStatus }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`navigation-framework ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="collapse-button" onClick={toggleCollapse}>
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="icon-dashboard"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/properties">
              <i className="icon-properties"></i>
              <span>Properties</span>
            </Link>
          </li>
          <li>
            <Link to="/bookings">
              <i className="icon-bookings"></i>
              <span>Bookings</span>
            </Link>
          </li>
          <li>
            <Link to="/messages">
              <i className="icon-messages"></i>
              <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <i className="icon-settings"></i>
              <span>Settings</span>
            </Link>
          </li>
          {userStatus === 'admin' && (
            <li>
              <Link to="/admin">
                <i className="icon-admin"></i>
                <span>Admin</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationFramework;
