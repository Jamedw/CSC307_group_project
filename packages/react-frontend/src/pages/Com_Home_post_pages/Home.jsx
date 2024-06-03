import Sidebar from './componets/Sidebar';
import React, { useState } from 'react';
import Posts from './componets/Posts';
import Comments from './componets/Comments';
import Navbar from './componets/Navbar';
import NotFound from './NotFound.jsx';
import './Home.css';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import CommunityPosts from './componets/CommunityPosts.jsx';
import { create } from 'file-entry-cache';

function Home(props) {
  var token = props.token;
  let params = useParams();

  const [loggedIn, setLoggedIn] = useState(false);

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
      memberCount: 0,
      posts: [1, 2, 3, 4],
    },
    { id: 1, communityName: 'testCommunity1', memberCount: 0, posts: [5] },
    { id: 2, communityName: 'testCommunity2', memberCount: 0, posts: [6] },
    { id: 3, communityName: 'testCommunity3', memberCount: 0, posts: [7, 8] },
    {
      id: 4,
      communityName: 'testCommunity4',
      memberCount: 0,
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
      postTitle: 'this is my post on community 1',
      postContent: 'this is my post on community 1',
      comments: [8, 9],
    },
    {
      id: 6,
      upVotes: 0,
      downVotes: 0,
      postTitle: 'this is my 1st new post on community 2',
      postContent: 'yup this is my first post on community 2',
      comments: [8, 9],
    },
  ]);

  const [comments, setComments] = useState([
    { id: 1, userName: 'test_username', commentContent: 'comment 1' },
    { id: 2, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 3, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 4, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 5, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 6, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 7, userName: 'test_username', commentContent: 'this is id 1' },
    { id: 8, userName: 'test_username', commentContent: 'comment id 8' },
    { id: 9, userName: 'test_username', commentContent: 'comment id 9' },
    { id: 10, userName: 'test_username', commentContent: 'this is id 1' },
  ]);

  function getUserCommunities() {
    return communities.filter(community =>
      user.communities.includes(community.id)
    );
  }

  function getCommunityPosts(community) {
    return posts.filter(post => community.posts.includes(post.id));
  }

  function getPostCommments(post) {
    return comments.filter(comment => post.comments.includes(comment.id));
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
    const updated = user.communities.filter(
      currentcommunity => currentcommunity != community.id,
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
        element.comments = [comment.id, ...element.comments];
      }
    });
    setComments([comment, ...comments]);
  }

  function getCommunityByPostid(post) {
    var flag = false;
    communities.forEach(community => {
      if (community.posts.includes(post.id)) {
        flag = community;
      }
    });
    return flag;
  }

  function getCommunityByName(name) {
    var flag = false;
    communities.forEach(community => {
      if (community.communityName === name) {
        flag = community;
      }
    });
    return flag;
  }

  function isUserCommunity(community) {
    if (user.communities.includes(community.id)) {
      return true;
    }
    return false;
  }

  function getPostCommentsByid(currentpostid) {}

  function getPostByCommunityPostName(communityname, postTitle) {
    const community = getCommunityByName(communityname);
    var postids = posts.filter(post => community.posts.includes(post.id));
    var currentpost = posts.filter(post => post.postTitle === postTitle);
    return currentpost[0];
  }

  function createNewPost(community, post) {
    const updated = communities.filter(
      currentcommunity => currentcommunity.id !== community.id,
    );
    setCommunities([
      {
        id: community.id,
        communityName: community.communityName,
        memberCount: community.memberCount,
        posts: [post.id, ...community.posts],
      },
      ...updated,
    ]);

    setPosts([post, ...posts]);

    console.log(communities);
    console.log(posts);
  }

  function search(query) {
    // this query will be handles by the backend and will return a
    // list of post then setPosts(fetch ... )
    // will be called filling the screen with the new posts
  }

  if (token !== 'INVALID_TOKEN') {
    setLoggedIn(true);
  }


  if (params.communityName && params.postHeader) {
    var currentPost = getPostByCommunityPostName(
      params.communityName,
      params.postHeader,
    );

    try {
      return (
        <div className="home">
          <div>
            <Navbar />
          </div>
          <div class="wrapper">
            <div class="sidebar">
              <Sidebar
                loggedIn={loggedIn}
                createCommunity={createCommunity}
                userCommunities={getUserCommunities()}
              />
            </div>
            <div class="main">
              <Comments
                loggedIn={loggedIn}
                currentPostComments={getPostCommments(currentPost)}
                currentPost={currentPost}
                createComment={createComment}
              />
            </div>
            <div></div>
          </div>
          <div className="footer">test</div>
        </div>
      );
    } catch (e) {
      return <NotFound />;
    }
  } else if (params.communityName) {
    try {
      return (
        <div className="home">
          <div>
            <Navbar />
          </div>
          <div class="wrapper">
            <div class="sidebar">
              <Sidebar
                loggedIn={loggedIn}
                createCommunity={createCommunity}
                userCommunities={getUserCommunities()}
              />
            </div>
            <div class="main">
              <CommunityPosts
                loggedIn={loggedIn}
                createNewPost={createNewPost}
                isUserCommunity={isUserCommunity}
                currentCommunity={getCommunityByName(params.communityName)}
                getCommunityByPostid={getCommunityByPostid}
                userCommunities={getUserCommunities}
                unfollowCommunity={unfollowCommunity}
                followCommunity={followCommunity}
                posts={getCommunityPosts(
                  getCommunityByName(params.communityName),
                )}
              />
            </div>
            <div></div>
          </div>
          <div className="footer"></div>
        </div>
      );
    } catch (e) {
      return <NotFound />;
    }
  } else {
    return (
      <div className="home">
        <div>
          <Navbar />
        </div>
        <div class="wrapper">
          <div class="sidebar">
            <Sidebar
              loggedIn={loggedIn}
              createCommunity={createCommunity}
              userCommunities={getUserCommunities()}
            />
          </div>
          <div class="main">
            <Posts getCommunityByPostid={getCommunityByPostid} posts={posts} />
          </div>
          <div></div>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default Home;
