import React, { useState } from 'react';
import './EmailCaptureForm.css';

const EmailCaptureForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Add logic to store submitted emails securely
    // Implement spam protection measures
    setSubmitted(true);
    setError('');
  };

  return (
    <form className="email-capture-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Join Waitlist</button>
      {error && <p className="error-message">{error}</p>}
      {submitted && <p className="success-message">Thank you for signing up! Please check your email for confirmation.</p>}
    </form>
  );
};

export default EmailCaptureForm;
