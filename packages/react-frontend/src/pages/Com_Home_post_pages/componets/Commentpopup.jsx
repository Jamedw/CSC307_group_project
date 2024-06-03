import { even, exp } from 'prelude-ls';

import Popup from 'reactjs-popup';
import React, { useState } from 'react';

function Commentpopup(props) {
  const handleCommentchange = event => {
    setComment({ id: Math.random(), userName: '', commentContent: event.target.value });
  };

  const [comment, setComment] = useState({
    id: Math.random(),
    userName: '',
    commentContent: '',
  });

  function submitComment() {
    props.createComment(props.currentPost, comment);
    setComment({ id: Math.random(), userName: '', commentContent: ''});
  }

  function resetComment() {
    setComment({ id: Math.random(), userName: '', commentContent: '' });
  }

  return (
    <Popup
      onClose={resetComment}
      contentStyle={{
        opacity: 1,
      }}
      overlayStyle={{
        backgroundColor: `rgba(0,0,0,.5)`,
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
                placeholder='Enter Comment text'
                value={comment.commentContent}
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
  );
}

export default Commentpopup;
