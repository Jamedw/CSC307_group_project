import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import '../LandingPage/Posts';
import { NavLink, redirect, useNavigate, useParams } from 'react-router-dom';

function Createcommunitypopup(props) {


  function handleChange(e) {
    

    if (e.target.value.charCodeAt(e.target.value.length-1) === 10) {
      createNewCommunity()
      return true
    } else {
      setCommunity({
        id: commuity.id,
        communityName: e.target.value,
        membercount: 1,
        posts: [],
      });
      return false
    }
    
  }

  const [commuity, setCommunity] = useState({
    id: Math.random(),
    communityName: '',
    membercount: 1,
    posts: [],
  });

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
      id: Math.random(),
      communityName: '',
      membercount: 1,
      posts: [],
    });
  }

  return (
    <Popup
      key="Createcommunitypopup"
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
        <button type="button" className="createCommunityTab">
          Create Community
        </button>
      }
      modal
      nested>
      {close => (
        <div className="modal">
          <div className="content">
            <div>
              <textarea
                name="commenttext"
                placeholder="Enter Community Name"
                value={commuity.communityName}
                onChange={(e) => {
                  if(handleChange(e)){
                    close();
                  }
                }}
                id=""
                cols="40"
                rows="1"
                style={{ margin: 10 }}></textarea>
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
        </div>
      )}
    </Popup>
  );
}

export default Createcommunitypopup;
