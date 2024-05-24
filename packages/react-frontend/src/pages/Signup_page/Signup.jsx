import React, { useState } from 'react';
import './Signup.css'; // Import CSS for Signup component styling
import calpolyLogo from '../../assets/calpolylogo.png'; // Import the image

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Handle signup logic here, e.g., send user data to server for registration
    console.log('Signing up with:', { username, password, confirmPassword });
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="form-container">
          <img src={calpolyLogo} alt="Cal Poly Logo" className="logo-image" />
          <form>
            <div className="input-container">
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="input-field"
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="input-field"
              />
            </div>
            <button
              type="button"
              onClick={handleSignup}
              className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
