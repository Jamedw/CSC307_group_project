// Sidebar.jsx
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './Sidebar.css';

function CreateCommunityTabs(props) {
  const [commuity, setCommunityName] = useState({
    communityName: '',
    post: [],
  });

  const handlecommunityNamechange = event => {
    setCommunityName({
      communityName: event.target.value,
      post: [],
    });
  };

  function createNewCommunity() {
    createCommunity(commuity);
    setCommunityName({
      communityName: '',
      post: [],
    });
  }

  function resetCommunity() {
    setCommunityName({
      communityName: '',
      post: [],
    });
  }

  const userCommunities = props.userCommunities;
  const createCommunity = props.createCommunity;
  const navigate = useNavigate();
  const rows = userCommunities.map((community, index) => (
    <div
      className="communityTab"
      onClick={() => navigate(community.communityName)}>
      {community.communityName}
    </div>
  ));

  return (
    <div style={{ overflow: scroll }}>
      {rows}
      <Popup
        onClose={() => {
          resetCommunity;
        }}
        contentStyle={{
          opacity: 1,
        }}
        overlayStyle={{
          backgroundColor: `rgba(0,0,0,.5)`,
        }}
        trigger={
          <button role="button" className="createCommunityTab">
            Create Community
          </button>
        }
        modal
        nested>
        {close => (
          <div className="modal">
            <div>Community Name:</div>
            <div className="content">
              <div>
                <textarea
                  name="commenttext"
                  value={commuity.communityName}
                  onChange={handlecommunityNamechange}
                  id=""
                  cols="40"
                  rows="10"
                  style={{ margin: 10 }}></textarea>
              </div>
            </div>
            <div>
              <button
                class="button-2"
                onClick={() => {
                  close();
                  createNewCommunity();
                }}
                role="button">
                Create community
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

function Sidebar(props) {
  return (
    <CreateCommunityTabs
      createCommunity={props.createCommunity}
      userCommunities={props.userCommunities}
    />
  );
}

export default Sidebar;
