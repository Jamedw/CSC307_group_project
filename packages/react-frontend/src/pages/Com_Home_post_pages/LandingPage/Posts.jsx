import React, { useEffect, useState } from 'react';
import './Post.css';
import { NavLink, redirect, useNavigate, useParams } from 'react-router-dom';
import { white } from 'color-name';

function TableBody(props) {
  const nav = useNavigate();
  function getCommunityName(post) {
    return props.getCommunityByPostid(post.id);
  }

  const rows = props.posts.map(post => {
    var communityname = props.getCommunityByPostid(post).communityName;

    return (
      <div className="post">
        <NavLink to={'/' + communityname}>C/ {communityname}</NavLink>
        <div className="title"></div>
        <NavLink
          style={{ color: 'white', fontSize: '20px' }}
          to={communityname + '/' + post.postTitle}>
          {post.postTitle}
        </NavLink>
      </div>
    );
  });

  return <div>{rows}</div>;
}

function Posts(props) {
  return (
    <TableBody
      getCommunityByPostid={props.getCommunityByPostid}
      posts={props.posts}
    />
  );
}

export default Posts;
