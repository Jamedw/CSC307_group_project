import Sidebar from './componets/Sidebar';
import React, { useState } from 'react';
import Posts from './componets/Posts';
import Comments from './componets/Comments';
import Navbar from './componets/Navbar';
import './Home.css';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../images/stanchevmeme.png';
import { get } from 'fast-levenshtein';
import { create } from 'file-entry-cache';

function Home() {
  let params = useParams();
  console.log(params);

  const [user, setUser] = useState({
    Username: 'test_username',
    password: 'test_password',
    comments: [],
    posts: [],
    communities: [1, 2, 4],
  });

  const [communities, setCommunities] = useState([
    {
      id: 0,
      communityName: 'testCommunity0',
      membercount: 0,
      posts: [1, 2, 3, 4],
    },
    { id: 1, communityName: 'testCommunity1', membercount: 0, posts: [5] },
    { id: 2, communityName: 'testCommunity2', membercount: 0, posts: [6] },
    { id: 3, communityName: 'testCommunity3', membercount: 0, posts: [7, 8] },
    {
      id: 4,
      communityName: 'testCommunity4',
      membercount: 0,
      posts: [9, 10, 11],
    },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      upVotes: 0,
      downVotes: 0,
      postTitle: 'this is my 1st new post',
      postContent: 'yup this is my first post',
      comments: [1, 2, 3, 4],
    },
    {
      id: 2,
      upVotes: 0,
      downVotes: 0,
      postTitle: 'this is my 1st new post',
      postContent: 'yup this is my first post',
      comments: [4, 5],
    },
    {
      id: 3,
      upVotes: 0,
      downVotes: 0,
      postTitle: 'this is my 1st new post',
      postContent: 'yup this is my first post',
      comments: [6],
    },
    {
      id: 4,
      upVotes: 0,
      downVotes: 0,
      postTitle: 'this is my 1st new post',
      postContent: 'yup this is my first post',
      comments: [7],
    },
    {
      id: 5,
      upVotes: 0,
      downVotes: 0,
      postTitle: 'this is my 1st new post',
      postContent: 'yup this is my first post',
      comments: [8, 9],
    },
  ]);

  const [comments, setComments] = useState([
    { id: 1, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 2, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 3, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 4, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 5, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 6, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 7, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 8, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 9, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 10, userName: 'test_username', commentContent: 'this is id 1' },
  ]);

  function getUserCommunities() {
    return communities.filter(community =>
      user.communities.includes(community.id),
    );
  }
  function getCommunityPosts() {
    return posts.filter(post => communities.post.includes(post.id));
  }

  function getPostCommments() {
    return comments.filter(comment => posts.comments.includes(comment.id));
  }

  function createCommunity(community) {
    setUser({
      Username: user.Username,
      password: user.password,
      comments: user.comments,
      posts: user.posts,
      communities: [community.id , ... user.communities],
    });
    setCommunities([community , ...  communities]);
  }

  function unfollowCommunity(communityid) {
    const updated = user.communities.filter(community => {
      return communityid !== community;
    });
    setUser({
      Username: user.Username,
      password: user.password,
      comments: user.comments,
      posts: user.posts,
      communities: updated,
    });
  }

  function createComment(post, comment) {
    posts.forEach(element => {
      if (post.id === element.id) {
        element.comments = [comment.id, element.comments];
      }
    });
    setComments([comments, comment]);
  }

  function getCommunity(post) {
    communities.forEach(community => {
      if (community.posts.includes(post.id)) {
        return community
      }
    });
  }

  if (params.communityName && params.postHeader) {
    return (
      <div className="home">
        <div>
          <Navbar />
        </div>
        <div class="wrapper">
          <div class="sidebar">
            <Sidebar
              createCommunity={createCommunity}
              getUserCommunities={getUserCommunities}
            />
          </div>
          <div class="main">
            <Comments />
          </div>
          <div></div>
        </div>
        <div className="footer">test</div>
      </div>
    );
  } else if (params.communityName) {
    //if the url has / or /community loading post is the same the
    // community page only has a community

    return (
      <div className="home">
        <div>
          <Navbar />
        </div>
        <div class="wrapper">
          <div class="sidebar">
            <Sidebar
              createCommunity={createCommunity}
              getUserCommunities={getUserCommunities}
            />
          </div>
          <div class="main">
            <Posts
              getCommunity={getCommunity}
              userCommunities={getUserCommunities}
              createCommunity={createCommunity}
              unfollowCommunity={unfollowCommunity}
              posts={posts}
            />
          </div>
          <div></div>
        </div>
        <div className="footer">test</div>
      </div>
    );
  } else {
    
  }
}

export default Home;
