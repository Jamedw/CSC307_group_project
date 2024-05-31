import React, { useEffect, useState } from 'react';
import Newpostpopup from "./Newpostpopup.jsx"
import './Post.css';
import { NavLink, redirect, useNavigate, useParams } from 'react-router-dom';

function TableBody(props) {
  const nav = useNavigate();

  function followCommunity() {
    props.addUserCommunity({
      communityName: props.searchData.communityName,
    });
  }

  function isUserCommunity(userCommunities,community)
{
    var count=userCommunities.length;
    for(var i=0;i<count;i++)
    {
        if(userCommunities[i].communityName===community.communityName){return true;}
    }
    return false;
}

  function unfollowCommunity() {
    props.unfollowCommunity({
      communityName: props.searchData.communityName,
    });
  }

  function Followbutton() {
    if (
      isUserCommunity(props.userCommunities, {
        communityName: props.searchData.communityName,
      })
    ) {
      return (
        <button
        onClick={() => {
            unfollowCommunity();
        }}
        className="unfollow-button">
        unfollow
      </button>
      )
    } else {
      return (
        <button
        onClick={() => {
            followCommunity();
        }}
        className="follow-button">
        follow
      </button>
      )
    }
  }

  const rows = props.posts.map((post, index) => {
     return (
        <div className="post">
          <NavLink to={'/' + post.community}>C/ {post.community}</NavLink>
          <div className="title">
            <div>
              <button role="button" className="custom-button" />
            </div>
            <div>
              <button role="button" className="custom-button" />
            </div>
          </div>
          <NavLink to={post.community + '/' + post.header}>
            {post.header}
          </NavLink>
        </div>
      );
    
  });

  
    return <div>{rows}</div>;
  
}

function Posts(props) {
  return (
    <TableBody
    getCommunity={props.getCommunity}
    userCommunities={props.getUserCommunities}
    createCommunity={props.createCommunity}
    unfollowCommunity={props.unfollowCommunity}
    posts={props.posts}
    />
  );
}

export default Posts;
