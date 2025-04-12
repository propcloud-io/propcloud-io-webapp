import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import './RoleBasedAccessControl.css';

const RoleBasedAccessControl = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState({
    owner: 'property owner',
    teamMember: 'team member',
    admin: 'admin',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = firebase.firestore().collection('users');
        const snapshot = await usersRef.get();
        const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId, role) => {
    try {
      const userRef = firebase.firestore().collection('users').doc(userId);
      await userRef.update({ role });
      setUsers(users.map(user => (user.id === userId ? { ...user, role } : user)));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const inviteUser = async (email, role) => {
    try {
      const userRef = firebase.firestore().collection('users').doc();
      await userRef.set({ email, role });
      setUsers([...users, { id: userRef.id, email, role }]);
    } catch (error) {
      console.error('Error inviting user:', error);
    }
  };

  return (
    <div className="role-based-access-control">
      <h1>Role-Based Access Control</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                  >
                    {Object.keys(roles).map((roleKey) => (
                      <option key={roleKey} value={roles[roleKey]}>
                        {roles[roleKey]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="invite-user">
        <h2>Invite User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const role = e.target.role.value;
            inviteUser(email, role);
          }}
        >
          <input type="email" name="email" placeholder="Email" required />
          <select name="role" required>
            {Object.keys(roles).map((roleKey) => (
              <option key={roleKey} value={roles[roleKey]}>
                {roles[roleKey]}
              </option>
            ))}
          </select>
          <button type="submit">Invite</button>
        </form>
      </div>
    </div>
  );
};

export default RoleBasedAccessControl;
