import React, { useEffect, useState } from 'react';
import './Post.css';
import { NavLink, redirect, useNavigate } from 'react-router-dom';

function TableBody(props) {
  const nav = useNavigate();
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
              <button />
            </div>
            <div>
              <button />
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
        <div className="post">
          Welcome to r/ {props.searchData.communityName}!!!
        </div>
        {rows}
      </div>
    );
  } else {
    return <div>{rows}</div>;
  }
}

function Posts(props) {
  return <TableBody searchData={props.searchData} postData={props.postData} />;
}

export default Posts;
