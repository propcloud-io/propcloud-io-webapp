import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './TeamManagement.css';

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const teamRef = firebase.firestore().collection('teamMembers');
        const snapshot = await teamRef.get();
        const teamList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeamMembers(teamList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const addTeamMember = async (e) => {
    e.preventDefault();
    try {
      const teamRef = firebase.firestore().collection('teamMembers');
      const newMemberRef = await teamRef.add(newMember);
      setTeamMembers([...teamMembers, { id: newMemberRef.id, ...newMember }]);
      setNewMember({ name: '', email: '', role: '' });
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const updateTeamMember = async (id, updatedMember) => {
    try {
      const teamRef = firebase.firestore().collection('teamMembers').doc(id);
      await teamRef.update(updatedMember);
      setTeamMembers(teamMembers.map(member => (member.id === id ? { ...member, ...updatedMember } : member)));
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  const deleteTeamMember = async (id) => {
    try {
      const teamRef = firebase.firestore().collection('teamMembers').doc(id);
      await teamRef.delete();
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  return (
    <div className="team-management">
      <h1>Team Management</h1>
      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <div>
          <form onSubmit={addTeamMember}>
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              required
            />
            <button type="submit">Add Team Member</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>
                    <button onClick={() => updateTeamMember(member.id, { ...member, role: 'Updated Role' })}>Update</button>
                    <button onClick={() => deleteTeamMember(member.id)}>Delete</button>
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

export default TeamManagement;
