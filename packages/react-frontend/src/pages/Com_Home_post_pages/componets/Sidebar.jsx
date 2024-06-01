// Sidebar.jsx
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './Sidebar.css';

function CreateCommunityTabs(props) {
  const userCommunities = props.getUserCommunities();

  const navigate = useNavigate();

  const rows = userCommunities.map((community, index) => (
    <div
      className="communityTab"
      onClick={() => navigate(community.communityName)}>
      {community.communityName}
    </div>
  ));

  function Addcommunitybutton() {
    const [commuity, setCommunity] = useState({
      id: Math.random(),
      communityName: '',
      membercount: 1,
      posts: [],
    });

    const handlecommunityNamechange = event => {
      setCommunity({
        id: commuity.id,
        communityName: event.target.value,
        membercount: 1,
        posts: [],
      });
    };

    function createNewCommunity() {
      props.createCommunity(commuity);
      setCommunity({
        id: Math.random(),
        communityName: '',
        membercount: 1,
        posts: [],
      });
    }

    function resetCommunity() {
      setCommunity({
        id: commuity.id,
        communityName: '',
        membercount: 1,
        posts: [],
      });
    }

    return (
      <Popup
        onClose={() => {
          resetCommunity();
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
    );
  }

  return (
    <div style={{ overflow: scroll }}>
      {rows}
      <div style={{ textAlign: 'center' }}>
        <Addcommunitybutton createCommunity={props.createCommunity} />
      </div>
    </div>
  );
}

function Sidebar(props) {
  return (
    <CreateCommunityTabs
      createCommunity={props.createCommunity}
      getUserCommunities={props.getUserCommunities}
    />
  );
}

export default Sidebar;
