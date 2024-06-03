import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link component
import './Login.css'; // Import CSS for Login component styling
import calpolyLogo from '../../assets/calpolylogo.png'; // Import the image


const Login = props => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here, e.g., send credentials to server for authentication
    var success = props.loginUser({ username: username, password: password });
    if (props.token === 'INVALID_TOKEN') {

    } else {
      navigate('/');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="img-container">
          <img
            onClick={() => {
              navigate('/');
            }}
            src={calpolyLogo}
            alt="Cal Poly Logo"
            className="logo"
          />{' '}
        </div>
        {/* Image replacement for login */}
        <div className="form-container">
          {' '}
          {/* New container for inputs and buttons */}
          <form>
            <div className="input-container">
              {' '}
              {/* Container for username input */}
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="input-field"
              />
            </div>
            <div className="input-container">
              {' '}
              {/* Container for password input */}
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="signup-button">
              Log In
            </button>
            {/* Maintain gold color */}
          </form>
        </div>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="signup-button">
          sign up
        </button>
        {/* Link to the signup page */}
      </div>
    </div>
  );
};

export default Login;
