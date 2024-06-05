// Sidebar.jsx
import React, { useState } from 'react';
import Createcommunitypopup from './Createcommunitypopup';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './Sidebar.css';

function CreateCommunityTabs(props) {
  const navigate = useNavigate();


  const rows = props.userCommunities.map(community => (
    <div
      className="communityTab"
      onClick={() => navigate(encodeURI(community.name))}>
      {community.name}
    </div>
  ));

  return (
    <div style={{ overflow: scroll }}>
      {rows}
      <div style={{ textAlign: 'center' }}>
        <Createcommunitypopup createCommunity={props.createCommunity} />
      </div>
    </div>
  );
}

function Sidebar(props) {
  const navigate = useNavigate();
  if (props.loggedIn) {
    return (
      <CreateCommunityTabs
        createCommunity={props.createCommunity}
        userCommunities={props.userCommunities}
      />
    );
  } else {
    return (
      <div
        className="communityTab"
        onClick={() => {
          navigate('/login');
        }}>
        Log in
      </div>
    );
  }
}

export default Sidebar;
