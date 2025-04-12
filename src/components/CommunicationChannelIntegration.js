import React, { useState, useEffect } from 'react';
import './CommunicationChannelIntegration.css';

const CommunicationChannelIntegration = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');

  useEffect(() => {
    // Fetch messages from the database
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage, channel: selectedChannel }),
      });
      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChannelChange = (e) => {
    setSelectedChannel(e.target.value);
  };

  return (
    <div className="communication-channel-integration">
      <h1>Communication Channel Integration</h1>
      <form onSubmit={handleSendMessage}>
        <textarea
          placeholder="Enter your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <select value={selectedChannel} onChange={handleChannelChange}>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>
        <button type="submit">Send Message</button>
      </form>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.channel}`}>
            <p>{message.content}</p>
            <span>{message.channel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationChannelIntegration;
