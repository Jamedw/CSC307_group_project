import Sidebar from './componets/Sidebar';
import React, { useState } from 'react';
import Posts from './componets/Posts';
import Comments from './componets/Comments';
import Navbar from './componets/Navbar';
import './Home.css';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import CommunityPosts from './componets/CommunityPosts.jsx';

function Home() {
  let params = useParams();

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
      communities: [community.id, ...user.communities],
    });
    setCommunities([community, ...communities]);
  }

  function followCommunity(community) {
    setUser({
      Username: user.Username,
      password: user.password,
      comments: user.comments,
      posts: user.posts,
      communities: [community.id, ...user.communities],
    });
  }

  function unfollowCommunity(community) {
    const updated = user.communities.filter(currentcommunity => 
      currentcommunity != community.id
    );

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

  function getCommunityByPostid(post) {
    var flag = false
    communities.forEach(community => {
      if (community.posts.includes(post.id)) {
        flag = community;
      }
    });
    return flag
  }

  function getCommunityByName(name) {
    var flag = false
    communities.forEach((community) => {
      if (community.communityName === name) {
        flag = community;
      }
    });
    return flag
  }

  function isUserCommunity(community) {
    if (user.communities.includes(community.id)) {
      return true;
    }
    return false;
  }

  // if (params.communityName && params.postHeader) {
  //   return (
  //     <div className="home">
  //       <div>
  //         <Navbar />
  //       </div>
  //       <div class="wrapper">
  //         <div class="sidebar">
  //           <Sidebar
  //             createCommunity={createCommunity}
  //             getUserCommunities={getUserCommunities}
  //           />
  //         </div>
  //         <div class="main">
  //           <Comments

  //           />
  //         </div>
  //         <div></div>
  //       </div>
  //       <div className="footer">test</div>
  //     </div>
  //   );
  // } else
  if (params.communityName) {
    var communityHeader = getCommunityByName(params.communityName);

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
            <CommunityPosts
              isUserCommunity={isUserCommunity}
              communityHeader={communityHeader}
              getCommunityByPostid={getCommunityByPostid}
              userCommunities={getUserCommunities}
              unfollowCommunity={unfollowCommunity}
              followCommunity={followCommunity}
              posts={posts}
            />
          </div>
          <div></div>
        </div>
        <div className="footer">test</div>
      </div>
    );
  } else {
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
            <Posts getCommunityByPostid={getCommunityByPostid} posts={posts} />
          </div>
          <div></div>
        </div>
        <div className="footer">test</div>
      </div>
    );
  }
}

export default Home;
