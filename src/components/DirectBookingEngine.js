import React, { useState } from 'react';
import './DirectBookingEngine.css';

const DirectBookingEngine = () => {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    // Fetch availability and price for the selected date
    // This is a placeholder, replace with actual API call
    const available = true;
    const price = 100;
    setAvailability(available);
    setPrice(price);
  };

  const handleBooking = () => {
    // Implement booking confirmation logic
    // This is a placeholder, replace with actual booking logic
    setBookingConfirmed(true);
  };

  return (
    <div className="direct-booking-engine">
      <h2>Book Your Stay</h2>
      <div className="booking-form">
        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" onChange={handleDateChange} />
        {selectedDate && (
          <div className="availability-info">
            {availability ? (
              <div>
                <p>Price: ${price}</p>
                <button onClick={handleBooking}>Confirm Booking</button>
              </div>
            ) : (
              <p>No availability for the selected date.</p>
            )}
          </div>
        )}
      </div>
      {bookingConfirmed && <p>Booking confirmed! Thank you for choosing us.</p>}
    </div>
  );
};

export default DirectBookingEngine;
