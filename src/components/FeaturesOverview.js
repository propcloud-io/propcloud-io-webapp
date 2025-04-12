import React from 'react';
import './FeaturesOverview.css';

const FeaturesOverview = () => {
  return (
    <section className="features-overview">
      <div className="feature-section">
        <h2>Sales Automation</h2>
        <div className="feature">
          <img src="direct-booking-engine.png" alt="Direct Booking Engine" />
          <h3>Direct Booking Engine</h3>
          <p>Capabilities for direct bookings through your own website.</p>
        </div>
        <div className="feature">
          <img src="lead-management-system.png" alt="Lead Management System" />
          <h3>Lead Management System</h3>
          <p>Manage and track leads efficiently.</p>
        </div>
        <div className="feature">
          <img src="dynamic-pricing-intelligence.png" alt="Dynamic Pricing Intelligence" />
          <h3>Dynamic Pricing Intelligence</h3>
          <p>Optimize pricing with intelligent algorithms.</p>
        </div>
        <div className="feature">
          <img src="ota-channel-management.png" alt="OTA Channel Management" />
          <h3>OTA Channel Management</h3>
          <p>Manage multiple OTA channels from one platform.</p>
        </div>
      </div>
      <div className="feature-section">
        <h2>Operations Automation</h2>
        <div className="feature">
          <img src="cleaning-management.png" alt="Cleaning Management" />
          <h3>Cleaning Management</h3>
          <p>Automate and manage cleaning schedules.</p>
        </div>
        <div className="feature">
          <img src="maintenance-coordination.png" alt="Maintenance Coordination" />
          <h3>Maintenance Coordination</h3>
          <p>Coordinate maintenance tasks efficiently.</p>
        </div>
        <div className="feature">
          <img src="quality-assurance.png" alt="Quality Assurance" />
          <h3>Quality Assurance</h3>
          <p>Ensure consistent quality across properties.</p>
        </div>
        <div className="feature">
          <img src="team-communication.png" alt="Team Communication" />
          <h3>Team Communication</h3>
          <p>Enhance communication within your team.</p>
        </div>
      </div>
      <div className="feature-section">
        <h2>Communications Automation</h2>
        <div className="feature">
          <img src="ai-powered-messaging.png" alt="AI-Powered Messaging" />
          <h3>AI-Powered Messaging</h3>
          <p>Automate guest messaging with AI.</p>
        </div>
        <div className="feature">
          <img src="automated-message-sequences.png" alt="Automated Message Sequences" />
          <h3>Automated Message Sequences</h3>
          <p>Create and manage automated message sequences.</p>
        </div>
        <div className="feature">
          <img src="guest-support-portal.png" alt="Guest Support Portal" />
          <h3>Guest Support Portal</h3>
          <p>Provide a dedicated support portal for guests.</p>
        </div>
        <div className="feature">
          <img src="review-management.png" alt="Review Management" />
          <h3>Review Management</h3>
          <p>Manage and respond to guest reviews.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
