import React, { useState, useEffect } from 'react';
import './OTAIntegration.css';

const OTAIntegration = () => {
  const [platforms, setPlatforms] = useState([]);
  const [calendarSync, setCalendarSync] = useState([]);
  const [bookingConfirmation, setBookingConfirmation] = useState(false);

  useEffect(() => {
    // Fetch platforms and calendar sync data
    const fetchPlatforms = async () => {
      try {
        const response = await fetch('/api/platforms');
        const data = await response.json();
        setPlatforms(data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    };

    const fetchCalendarSync = async () => {
      try {
        const response = await fetch('/api/calendar-sync');
        const data = await response.json();
        setCalendarSync(data);
      } catch (error) {
        console.error('Error fetching calendar sync data:', error);
      }
    };

    fetchPlatforms();
    fetchCalendarSync();
  }, []);

  const handleBookingConfirmation = () => {
    // Implement booking confirmation logic
    // This is a placeholder, replace with actual booking confirmation logic
    setBookingConfirmation(true);
  };

  return (
    <div className="ota-integration">
      <h2>OTA Integration</h2>
      <div className="platforms">
        <h3>Connected Platforms</h3>
        <ul>
          {platforms.map((platform, index) => (
            <li key={index}>{platform.name}</li>
          ))}
        </ul>
      </div>
      <div className="calendar-sync">
        <h3>Calendar Synchronization</h3>
        <ul>
          {calendarSync.map((sync, index) => (
            <li key={index}>{sync.date}: {sync.status}</li>
          ))}
        </ul>
      </div>
      <div className="booking-confirmation">
        <h3>Booking Confirmation</h3>
        <button onClick={handleBookingConfirmation}>Confirm Booking</button>
        {bookingConfirmation && <p>Booking confirmed!</p>}
      </div>
    </div>
  );
};

export default OTAIntegration;
