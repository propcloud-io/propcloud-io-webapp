import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Autonomous Property Management for Short-Term Rentals</h1>
        <p>Save time and increase revenue with our automated solution.</p>
        <form className="waitlist-signup">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Join Waitlist</button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
