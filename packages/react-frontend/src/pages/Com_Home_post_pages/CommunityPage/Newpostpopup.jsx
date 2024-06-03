import { React, useState } from 'react';

import Popup from 'reactjs-popup';

function Newpostpopup(props) {

  const [post, setPost] = useState({
    id: Math.random(),
    upVotes: 0,
    downVotes: 0,
    postTitle: '',
    postContent: '',
    comments: [],
  });

  const handleHeaderChange = event => {
    setPost({
      id: post.id,
      upVotes: 0,
      downVotes: 0,
      postTitle: event.target.value,
      postContent: post.postContent,
      comments: [],
    });
  };

  const handleContentChange = event => {
    setPost({
      id: post.id,
      upVotes: 0,
      downVotes: 0,
      postTitle: post.postTitle,
      postContent: event.target.value,
      comments: [],
    });
  };

  function resetPost() {
    setPost({
      id: Math.random(),
      upVotes: 0,
      downVotes: 0,
      postTitle: '',
      postContent: '',
      comments: [],
    });
  }

  return (
    <Popup
      onClose={() => {
        resetPost();
      }}
      contentStyle={{
        opacity: 1,
      }}
      overlayStyle={{
        backgroundColor: `rgba(0,0,0,.5)`,
      }}
      trigger={
        <button role="button" className="createCommunityTab">
          Create New Post
        </button>
      }
      modal
      nested>
      {close => (
        <div className="modal">

          <div className="content">
          <div>
              <textarea
                placeholder='Post Title'
                name="postTitle"
                onChange={handleHeaderChange}
                id=""
                cols="40"
                rows="1"
                style={{ margin: 10 }}></textarea>
            </div>
            <div>
              <textarea
                placeholder='Post Content'
                name="postContent"
                onChange={handleContentChange}
                id=""
                cols="40"
                rows="10"
                style={{ margin: 10 }}></textarea>
            </div>
            <div>
            <button
              class="button-2"
              onClick={() => {
                props.createNewPost(props.currentCommunity, post)
                close();
              }}
              role="button">
              Post
            </button>
            </div>
          </div>


        </div>
      )}
    </Popup>
  );
}

export default Newpostpopup;
