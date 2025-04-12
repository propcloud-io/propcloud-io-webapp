import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './UserAuthentication.css';

const UserAuthentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } else {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.auth().currentUser.sendEmailVerification();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setError('Password reset email sent.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      let authProvider;
      if (provider === 'google') {
        authProvider = new firebase.auth.GoogleAuthProvider();
      } else if (provider === 'facebook') {
        authProvider = new firebase.auth.FacebookAuthProvider();
      }
      await firebase.auth().signInWithPopup(authProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="user-authentication">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
      {isLogin && (
        <button onClick={handleForgotPassword}>Forgot Password?</button>
      )}
      <button onClick={() => handleSocialLogin('google')}>Login with Google</button>
      <button onClick={() => handleSocialLogin('facebook')}>Login with Facebook</button>
    </div>
  );
};

export default UserAuthentication;
