import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import './AccountManagement.css';

const AccountManagement = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    push: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
        const userDoc = await userRef.get();
        setUser(userDoc.data());

        const subscriptionRef = firebase.firestore().collection('subscriptions').doc(firebase.auth().currentUser.uid);
        const subscriptionDoc = await subscriptionRef.get();
        setSubscription(subscriptionDoc.data());

        const permissionsRef = firebase.firestore().collection('permissions').doc(firebase.auth().currentUser.uid);
        const permissionsDoc = await permissionsRef.get();
        setPermissions(permissionsDoc.data().roles);

        const notificationsRef = firebase.firestore().collection('notifications').doc(firebase.auth().currentUser.uid);
        const notificationsDoc = await notificationsRef.get();
        setNotifications(notificationsDoc.data());
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const updateSubscription = async (newSubscription) => {
    try {
      const subscriptionRef = firebase.firestore().collection('subscriptions').doc(firebase.auth().currentUser.uid);
      await subscriptionRef.update(newSubscription);
      setSubscription(newSubscription);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const updatePermissions = async (newPermissions) => {
    try {
      const permissionsRef = firebase.firestore().collection('permissions').doc(firebase.auth().currentUser.uid);
      await permissionsRef.update({ roles: newPermissions });
      setPermissions(newPermissions);
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  const updateNotifications = async (newNotifications) => {
    try {
      const notificationsRef = firebase.firestore().collection('notifications').doc(firebase.auth().currentUser.uid);
      await notificationsRef.update(newNotifications);
      setNotifications(newNotifications);
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  };

  return (
    <div className="account-management">
      <h1>Account Management</h1>
      {user && (
        <div className="user-info">
          <h2>User Information</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      {subscription && (
        <div className="subscription-info">
          <h2>Subscription</h2>
          <p>Plan: {subscription.plan}</p>
          <p>Status: {subscription.status}</p>
          <button onClick={() => updateSubscription({ plan: 'new-plan', status: 'active' })}>Update Subscription</button>
        </div>
      )}
      <div className="permissions-info">
        <h2>Permissions</h2>
        <ul>
          {permissions.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
        <button onClick={() => updatePermissions([...permissions, 'new-role'])}>Add Role</button>
      </div>
      <div className="notifications-info">
        <h2>Notification Preferences</h2>
        <label>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={(e) => updateNotifications({ ...notifications, email: e.target.checked })}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={notifications.sms}
            onChange={(e) => updateNotifications({ ...notifications, sms: e.target.checked })}
          />
          SMS Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={notifications.push}
            onChange={(e) => updateNotifications({ ...notifications, push: e.target.checked })}
          />
          Push Notifications
        </label>
      </div>
    </div>
  );
};

export default AccountManagement;
