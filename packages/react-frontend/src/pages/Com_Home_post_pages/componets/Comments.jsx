import Popup from 'reactjs-popup';
import React, { useState } from 'react';
import './Comments.css';

function TableBody(props) {
  const [comment, setComment] = useState({
    text: '',
    likes: 0,
    dislikes: 0,
  });

  function resetComment() {
    setComment({
      text: '',
      likes: 0,
      dislikes: 0,
    });
  }

  function submitComment() {
    console.log(comment);
    props.submitComment(comment);
    setComment({
      text: '',
      likes: 0,
      dislikes: 0,
    });
  }

  const postData = props.postData;
  const commentData = props.commentData;

  const handleCommentchange = event => {
    setComment({
      text: event.target.value,
      likes: 0,
      dislikes: 0,
    });
  };

  const rows = props.commentData.map((commentData, index) => {
    return (
      <div className="comment">
        {commentData.text}
        <div className="interact"></div>
      </div>
    );
  });

  return (
    <div>
      <div className="post">
        <h1>{postData.header}</h1>
        <div>{postData.text}</div>
        <div className="interact">
          <div>
            <button role="button" className="custom-button" />
          </div>
          <div>
            <button role="button" className="custom-button" />
          </div>
          <div>
            <Popup
              onClose={resetComment}
              contentStyle={{
                opacity: 1,
              }}
              overlayStyle={{
                backgroundColor: `rgba(0,0,0,.5)` ,
              }}
              trigger={
                <button role="button" className="custom-button">
                  +
                </button>
              }
              modal
              nested>
              {close => (
                <div className="modal">
                  <div>Commment:</div>
                  <div className="content">
                    <div>
                      <textarea
                        name="commenttext"
                        value={comment.text}
                        onChange={handleCommentchange}
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
                        submitComment();
                        close();
                      }}
                      role="button">
                      Post comment
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
      {rows}
    </div>
  );
}

function Posts(props) {
  return (
    <TableBody
      postData={props.postData}
      commentData={props.commentData}
      submitComment={props.submitComment}
    />
  );
}

export default Posts;
