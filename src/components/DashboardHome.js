import React from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="property-overview">
        <h2>Property Overview</h2>
        <p>Key metrics about your properties will be displayed here.</p>
      </div>
      <div className="calendar-view">
        <h2>Calendar View</h2>
        <p>View your bookings in a calendar format.</p>
      </div>
      <div className="upcoming-tasks">
        <h2>Upcoming Tasks</h2>
        <p>List of upcoming tasks and deadlines.</p>
      </div>
      <div className="revenue-snapshot">
        <h2>Revenue Snapshot</h2>
        <p>Overview of your revenue.</p>
      </div>
      <div className="recent-guest-communications">
        <h2>Recent Guest Communications</h2>
        <p>Recent communications with your guests.</p>
      </div>
    </div>
  );
};

export default DashboardHome;
