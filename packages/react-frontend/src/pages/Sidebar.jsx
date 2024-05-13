// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Login">Log in</Link></li>
        <li><Link to="/Signup">Sign up</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;