
import React, { useState } from 'react';
import Commentpopup from './Commentpopup';
import './Comments.css';

function TableBody(props) {

  const rows = props.currentPostComments.map(comment => {
    return (
      <div className="comment">
        <div>
          {comment.commentContent}
        </div>
        <div className="interact"></div>
      </div>
    );
  });

  return (
    <div>
      <div className="post">
        <div style={{fontSize: "30px", color: 'white'}}>
          {props.currentPost.postTitle}
        </div>
        <div > 
          {props.currentPost.postContent}
        </div>

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
}

function Posts(props) {
  return (
    <TableBody
    currentPostComments={props.currentPostComments}
    currentPost={props.currentPost}
    createComment={props.createComment}
    />
  );
}

export default Posts;
