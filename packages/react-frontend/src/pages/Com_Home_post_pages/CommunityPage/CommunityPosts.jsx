import React, { useEffect, useState } from 'react';
import Newpostpopup from './Newpostpopup';
import '../LandingPage/Posts';
import { NavLink, redirect, useNavigate, useParams } from 'react-router-dom';

function TableBody(props) {
  const nav = useNavigate();
  var communityname = props.currentCommunity.communityName;
  var currentCommunity = props.currentCommunity;

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
    if (props.loggedIn){
      if (props.isUserCommunity(currentCommunity)) {
        return (
          <button
            style={{ width: '100px' }}
            onClick={() => {
              props.unfollowCommunity(currentCommunity);
            }}
            className="createCommunityTab">
            unfollow
          </button>
        );
      } else {
        return (
          <button
            style={{ width: '100px' }}
            onClick={() => {
              props.followCommunity(currentCommunity);
            }}
            className="createCommunityTab">
            follow
          </button>
        );
      }
    } else {
      return (
        <button
        style={{ width: '100px' }}
        onClick={() => {
          nav("/login")
        }}
        className="createCommunityTab">
        follow
      </button>
      );
    }
  }

  console.log(props.posts);

  const rows = props.posts.map((post, index) => {
    return (
      <div className="post">
        <div>
          <NavLink to={'/' + communityname}>C/ {communityname}</NavLink>
        </div>
        <div>
          <NavLink
            style={{ color: 'white', fontSize: '20px' }}
            to={communityname + '/' + post.postTitle}>
            {post.postTitle}
          </NavLink>
        </div>
      </div>
    );
  });

  if(props.loggedIn){
    return (
      <div>
        <div className="post">
          <div style={{ color: 'white', fontSize: '25px' }}>
            Welcome to C/ {communityname}
          </div>
          <div className="communityTitle">
            <div>
              <Followbutton />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Newpostpopup
                currentCommunity={props.currentCommunity}
                createNewPost={props.createNewPost}
              />
            </div>
          </div>
        </div>
        {rows}
      </div>
    );
  } else {
    return (
      <div>
        <div className="post">
          <div style={{ color: 'white', fontSize: '25px' }}>
            Welcome to C/ {communityname}
          </div>
          <div className="communityTitle">
            <div>
              <Followbutton />
            </div>
            <div>
            <button
   
        onClick={() => {
          nav("/login")
        }}
        className="createCommunityTab">
                  Create New Post
        </button>
            </div>
          </div>
        </div>
        {rows}
      </div>
    );
  }
}

function Posts(props) {
  return (
    <TableBody
      loggedIn={props.loggedIn}
      createNewPost={props.createNewPost}
      currentCommunity={props.currentCommunity}
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
