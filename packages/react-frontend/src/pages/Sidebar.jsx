// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Log_in">Log in</Link></li>
        <li><Link to="/Sign_up">Sign up</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;