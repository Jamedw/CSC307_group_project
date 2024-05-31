import React, { useEffect, useState } from 'react';
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

  const rows = props.postData.map((post, index) => {
    if (post.postimg !== undefined) {
      return (
        <div className="post">
          <NavLink to={post.community}>C/ {post.community}</NavLink>
          <div className="img">
            <div>
              <img src={post.postimg} />
            </div>
          </div>
          <div className="title">
            <div>
              <img
                src={post.postimg}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
            </div>
            <div>{post.username}</div>
            <NavLink to={post.community + '/' + post.header}>
              {post.header}
            </NavLink>
          </div>
        </div>
      );
    } else {
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
    }
  });

  if (props.searchData.communityName) {
    return (
      <div>
        <div className="community">
          <div className="header">
            <div>Welcome to r/ {props.searchData.communityName}!!!</div>
            <div>
              <Followbutton />
            </div>
          </div >
          <div style={{textAlign : 'center'}}>
          test
          </div>

        </div>
        {rows}
      </div>
    );
  } else {
    return <div>{rows}</div>;
  }
}

function Posts(props) {
  return (
    <TableBody
      userCommunities={props.userCommunities}
      searchData={props.searchData}
      postData={props.postData}
      addUserCommunity={props.addUserCommunity}
      unfollowCommunity={props.unfollowCommunity}
    />
  );
}

export default Posts;
