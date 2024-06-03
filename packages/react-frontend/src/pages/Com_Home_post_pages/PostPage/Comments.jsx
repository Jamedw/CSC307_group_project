import React, { useState } from 'react';
import Commentpopup from './Commentpopup';
import './Comments.css';
import { useNavigate } from 'react-router-dom';

function TableBody(props) {
  const nav = useNavigate();
  const rows = props.currentPostComments.map(comment => {
    return (
      <div className="comment">
        <div>{comment.commentContent}</div>
        <div className="interact"></div>
      </div>
    );
  });

  if (props.loggedIn) {
    return (
      <div>
        <div className="post">
          <div style={{ fontSize: '30px', color: 'white' }}>
            {props.currentPost.postTitle}
          </div>
          <div>{props.currentPost.postContent}</div>

          <div className="interact">
            <Commentpopup
              currentPost={props.currentPost}
              createComment={props.createComment}
            />
          </div>
        </div>
        {rows}
      </div>
    );
  } else {
    return (
      <div>
        <div className="post">
          <div style={{ fontSize: '30px', color: 'white' }}>
            {props.currentPost.postTitle}
          </div>
          <div>{props.currentPost.postContent}</div>

          <div className="interact">
            <div
            style={{width: "40px"}}
              onClick={() => {
                nav('/login');
              }}
              className="communityTab">
              Log In
            </div>
            <div></div>
            <div></div>
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
      currentPostComments={props.currentPostComments}
      currentPost={props.currentPost}
      createComment={props.createComment}
    />
  );
}

export default Posts;
