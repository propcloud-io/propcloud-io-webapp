import React from 'react';
import './ConfirmationMessage.css';

const ConfirmationMessage = ({ email, waitlistPosition, estimatedAccessTime }) => {
  return (
    <div className="confirmation-message">
      <h2>Thank you for signing up!</h2>
      <p>We've received your email: {email}</p>
      <p>Your waitlist position: {waitlistPosition}</p>
      <p>Estimated access time: {estimatedAccessTime}</p>
      <p>Please check your email for further instructions and confirmation.</p>
    </div>
  );
};

export default ConfirmationMessage;
