import React from 'react';
import './Navbar.css';
import logo from '../../images/calpoly.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const navigate = useNavigate();
  return (
    <div className="top-nav">
      <div>
        <a href="/">
          <img
            src={logo}
            style={{ height: 50, borderRadius: 50, width: 50, margin: 10 }}
            alt="horsey"
          />
        </a>
      </div>
      <div>
        <input
          style={{ borderRadius: 20 }}
          name="Community_Post"
          type="text"
          placeholder="Search For Post or Community"
          size={50}
          className="input-field"
        />
      </div>
      <div>
        <button
          onClick={() => navigate("/login")}
          className="custom-button"
          style={{ margin: 10, paddingRight: 20, paddingLeft: 20 }}>
          Log in
        </button>
      </div>
    </div>
  );
}
