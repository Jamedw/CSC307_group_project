import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link component
import './Login.css'; // Import CSS for Login component styling
import calpolyLogo from '../../assets/calpolylogo.png'; // Import the image

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here, e.g., send credentials to server for authentication
    console.log('Logging in with:', { username, password });
    props.loginUser({username : username, password : password})
    
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src={calpolyLogo} alt="Cal Poly Logo" className="logo" />{' '}
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
              role="button"
              onClick={handleLogin}
              className="signup-button">
              Log In
            </button>
            {/* Maintain gold color */}
          </form>
        </div>
        <button
          role="button"
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
