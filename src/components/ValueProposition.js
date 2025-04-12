import React from 'react';
import './ValueProposition.css';

const ValueProposition = () => {
  return (
    <section className="value-proposition">
      <div className="benefit-card">
        <img src="icon-time-savings.png" alt="Time Savings Icon" />
        <h3>Time Savings</h3>
        <p>Reduce management time by up to 80% with our automated solution.</p>
      </div>
      <div className="benefit-card">
        <img src="icon-revenue-increase.png" alt="Revenue Increase Icon" />
        <h3>Revenue Increase</h3>
        <p>Increase revenue by 15-30% through optimized pricing and direct bookings.</p>
      </div>
      <div className="benefit-card">
        <img src="icon-operational-excellence.png" alt="Operational Excellence Icon" />
        <h3>Operational Excellence</h3>
        <p>Ensure consistent quality across properties with our operational tools.</p>
      </div>
      <div className="benefit-card">
        <img src="icon-guest-satisfaction.png" alt="Guest Satisfaction Icon" />
        <h3>Guest Satisfaction</h3>
        <p>Improve communication and guest experience with our platform.</p>
      </div>
    </section>
  );
};

export default ValueProposition;
