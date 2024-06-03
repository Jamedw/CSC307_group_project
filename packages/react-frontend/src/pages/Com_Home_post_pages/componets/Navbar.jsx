import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../images/calpoly.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const navigate = useNavigate();
  const [search , setSearch] = useState("")

  function handleKeyPressed(e){
    if(event.key == 'Enter'){
      
      setSearch("")
    }else {
      setSearch(e.value)
    }
  }

  return (
    <div className="top-nav">
      <div>
        <img
          onClick={() => {
            navigate('/');
          }}
          src={logo}
          style={{
            cursor: 'pointer',
            height: 50,
            borderRadius: 50,
            width: 50,
            margin: 10,
          }}
          alt="horsey"
        />
      </div>
      <div>
        <input
          style={{ borderRadius: 20 }}
          name="Community_Post"
          onKeyDown={handleKeyPressed}
          value={search}
          type="text"
          placeholder="Search For Post or Community"
          size={50}
          className="input-field"
        />
      </div>
      <div>
        <button
          onClick={() => navigate('/login')}
          className="custom-button"
          style={{ margin: 10, paddingRight: 20, paddingLeft: 20 }}>
          Log in
        </button>
      </div>
    </div>
  );
}
