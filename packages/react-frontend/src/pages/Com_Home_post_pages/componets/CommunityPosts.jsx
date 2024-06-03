import React, { useEffect, useState } from 'react';
import Newpostpopup from './Newpostpopup.jsx';
import './Post.css';
import { NavLink, redirect, useNavigate, useParams } from 'react-router-dom';

function TableBody(props) {
  const nav = useNavigate();
  const communityname = props.communityHeader.communityName
  const currentcommunity = props.communityHeader

  function isUserCommunity(userCommunities, community) {
    var count = userCommunities.length;
    for (var i = 0; i < count; i++) {
      if (userCommunities[i].communityName === community.communityName) {
        return true;
      }
    }
    return false;
  }

  function Followbutton() {
    if (
      props.isUserCommunity(currentcommunity)
    ) {
      return (
        <button
          onClick={() => {
            props.unfollowCommunity(currentcommunity);
          }}
          className="unfollow-button">
          unfollow
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            props.followCommunity(currentcommunity);
          }}
          className="follow-button">
          follow
        </button>
      );
    }
  }

  const rows = props.posts.map((post, index) => {
    return (
      <div className="post">
        <NavLink to={'/' + {communityname}}>C/ {communityname}</NavLink>
        <div className="title">
          <div>
            <button role="button" className="custom-button" />
          </div>
          <div>
            <button role="button" className="custom-button" />
          </div>
        </div>
        <NavLink to={communityname + '/' + communityname}>{communityname}</NavLink>
      </div>
    );
  });

  return (
    <div>
      <div className="header">
        <div>Welcome to r/ {props.communityHeader.communityName}!!!</div>
        <div>
          <Followbutton 
          communityHeader={props.communityHeader}
          />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>test</div>
      {rows}
    </div>
  );
}

function Posts(props) {
  return (
    <TableBody
      communityHeader={props.communityHeader}
      isUserCommunity={props.isUserCommunity}
      getCommunity={props.getCommunity}
      userCommunities={props.getUserCommunities}
      followCommunity={props.followCommunity}
      unfollowCommunity={props.unfollowCommunity}
      posts={props.posts}
    />
  );
}

export default Posts;
