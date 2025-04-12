import React, { useState, useEffect } from 'react';
import './AdminInterface.css';

const AdminInterface = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch waitlist submissions from the database
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/waitlist');
        const data = await response.json();
        setSubmissions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const exportEmailList = () => {
    const emailList = submissions.map(submission => submission.email).join('\n');
    const blob = new Blob([emailList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email_list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const inviteUser = (email) => {
    // Add logic to send invite to the user
    console.log(`Invite sent to ${email}`);
  };

  return (
    <div className="admin-interface">
      <h1>Admin Interface</h1>
      {loading ? (
        <p>Loading submissions...</p>
      ) : (
        <div>
          <button onClick={exportEmailList}>Export Email List</button>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Invite</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td>{submission.email}</td>
                  <td>
                    <button onClick={() => inviteUser(submission.email)}>Invite</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminInterface;
