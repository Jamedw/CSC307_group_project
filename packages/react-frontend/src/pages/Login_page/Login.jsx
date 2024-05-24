import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './Login.css'; // Import CSS for Login component styling
import calpolyLogo from '../../assets/calpolylogo.png'; // Import the image

const Login = (props) => {
  
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });



  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }


  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }

  return (
    <div className="login">
      <div className="login-container">
        <img src={calpolyLogo} alt="Cal Poly Logo" className="logo-image" />{' '}
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
            <a href="/Log_in">
              <button
                type="button"
                onClick={handleLogin}
                className="signup-button">
                Log In
              </button>{' '}
              {/* Maintain gold color */}
            </a>
          </form>
        </div>
        <Link to="/signup" className="signup-button">
          Sign Up
        </Link>{' '}
        {/* Link to the signup page */}
      </div>
    </div>
  );
};

export default Login;
