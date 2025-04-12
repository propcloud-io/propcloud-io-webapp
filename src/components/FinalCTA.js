import React, { useState } from 'react';
import './FinalCTA.css';

const FinalCTA = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add email validation and submission logic here
    setSubmitted(true);
  };

  return (
    <section className="final-cta">
      <div className="cta-content">
        <h2>Join Our Waitlist</h2>
        <p>Don't miss out on the opportunity to automate your property management and increase your revenue. Sign up now!</p>
        {!submitted ? (
          <form className="waitlist-signup" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Join Waitlist</button>
          </form>
        ) : (
          <p>Thank you for signing up! Please check your email for confirmation.</p>
        )}
      </div>
    </section>
  );
};

export default FinalCTA;
