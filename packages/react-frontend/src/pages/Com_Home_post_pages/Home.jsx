import Sidebar from './componets/Sidebar';
import React, { useEffect, useState } from 'react';
import Posts from './LandingPage/Posts.jsx';
import Comments from './PostPage/Comments.jsx';
import Navbar from './componets/Navbar.jsx';
import NotFound from './NotFound.jsx';
import './Home.css';
import { useParams } from 'react-router-dom';
import CommunityPosts from './CommunityPage/CommunityPosts.jsx';
import { cos } from 'prelude-ls';

function Home(props) {
  const INVALID_TOKEN = 'INVALID_TOKEN';
  const token = props.token;
  const [user, setUser] = useState('');
  const [userCommunities, setUserCommunities] = useState('');
  let params = useParams();
  let API_PREFIX = 'http://localhost:3000';

  function loggedIn() {
    if (token === INVALID_TOKEN) {
      return false;
    } else {
      return true;
    }
  }

  if (user !== props.user && user === '') {
    setUser(props.user);
  }
  if (userCommunities !== props.userCommunities && userCommunities === '') {
    setUserCommunities(props.userCommunities);
  }

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  function landingPage() {
    const promise = fetch(`${API_PREFIX}/search/home`).then(res => {
      console.log(res);
    });
    return promise;
  }

  const [communities, setCommunities] = useState([]);
  const [community, setCommunity] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  function getCommunityPosts(community) {
    return posts.filter(post => community.posts.includes(post.id));
  }

  //userId and name
  //returns
  function postCommunity(input) {
    const promise = fetch(`${API_PREFIX}/user/community`, {
      method: 'POST',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(input),
    });

    return promise;
  }

  function createCommunity(community) {
    postCommunity({
      userId: user._id,
      name: community.name,
    });
    setUser({
      Username: user.Username,
      password: user.password,
      comments: user.comments,
      posts: user.posts,
      communityIds: [community.id, ...user.communityIds],
    });

    setUserCommunities([community, ...userCommunities]);
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

  function postComment(input){
    const promise = fetch(`${API_PREFIX}/user/comment`, {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(input)
    });
  
    return promise;
  }

  function createComment(comment) {
    console.log(     user._id,
       post._id,
      user.username,
      comment.content)
    postComment({
      userId: user._id,
      postId: post._id,
      username : user.username,
      content : comment.content
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

  function initCommunity(name) {
    getCommunityByname(encodeURI(name));
  }

  function getCommunityByname(communityName) {
    const promise = fetch(`${API_PREFIX}/communityName/${communityName}`)
      .then(response => {
        if (response.status === 304) {
          response.json().then(payload => {
            setCommunity(payload.community);
            setPosts(payload.postsArr);
          });
        } else {
          response.json().then(payload => {
            setCommunity(payload.community);
            setPosts(payload.postsArr);
          });
        }
      })
      .catch(error => {});
    return promise;
  }

  function isUserCommunity(community) {
    console.log(community);
    if (user.communityIds.includes(community._id)) {
      return true;
    }
    return false;
  }

  function initPost(communityName, postName) {
    getPostbyCommunityPostId(communityName, postName);
  }

  function getPostbyCommunityPostId(communityName, postName) {
    const promise = fetch(`${API_PREFIX}/communityName/${communityName}/${postName}`)
      .then(response => {
        if (response.status === 304) {
          response.json().then(payload => {
            setPost(payload.post)
            setComments(payload.comments)
          });
        } else {
          response.json().then(payload => {
            setPost(payload.post)
            setComments(payload.comments)
          });
        }
      })
      .catch(error => {});
      return promise
  }

  function getPostCommments(post) {
    return comments.filter(comment => post.comments.includes(comment.id));
  }

  //needs a userId, communityid, postTitle, postContent
  function postPost(input) {
    const promise = fetch(`${API_PREFIX}/user/post`, {
      method: 'POST',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(input),
    });

    return promise;
  }

  function createNewPost(community, post) {
    postPost({
      userId: user._id,
      communityId: community._id,
      postTitle: post.postTitle,
      postContent: post.postContent,
    });
    setPosts([post, ...posts]);
  }

  function search(query) {
    // this query will be handles by the backend and will return a
    // list of post then setPosts(fetch ... )
    // will be called filling the screen with the new posts
  }

  /*The parameters of the url determine what is loaded in the main div 'main'
  If the communityName and a postHeader is present a search for a post must be done by community name and 
  post header, the post information is need so that when a new comment is create the comment can be linked to the
  associated Post, also we need to post information such as the post.Header, post.content, likes and dislikes*/

  /* An important aspect of the design is that all that changes is what is in the "main" div, the sidebar and navbar can be reused
  all that changes is what is in the "main" div*/
  if (params.communityName && params.postHeader) {
    if (post === undefined || post.postTitle !== decodeURI(params.postHeader)){
          initPost(params.communityName, params.postHeader);
    }
    try {
      return (
        <div className="home">
          <div>
            <Navbar logout={props.logout} loggedIn={loggedIn()} />
          </div>
          <div class="wrapper">
            <div class="sidebar">
              <Sidebar
                loggedIn={loggedIn()}
                createCommunity={createCommunity}
                userCommunities={userCommunities}
              />
            </div>
            <div class="main">
              <Comments
                loggedIn={loggedIn()}
                currentPostComments={comments}
                currentPost={post}
                createComment={createComment}
              />
            </div>
            <div></div>
          </div>
          <div className="footer">test</div>
        </div>
      );
    } catch (e) {
      return (
        <NotFound
          postHeader={params.postHeader}
          communityName={params.communityName}
        />
      );
    }
  } else if (params.communityName) {
    /* if the community Name is the only param in the url then the CommunityPosts element will be loaded
     */
    if (
      community === undefined ||
      decodeURI(params.communityName) !== community.name
    ) {
      initCommunity(params.communityName);
    }
    console.log(community);
    console.log(posts);

    try {
      return (
        <div className="home">
          <div>
            <Navbar logout={props.logout} loggedIn={loggedIn()} />
          </div>
          <div class="wrapper">
            <div class="sidebar">
              <Sidebar
                loggedIn={loggedIn()}
                createCommunity={createCommunity}
                userCommunities={userCommunities}
              />
            </div>
            <div class="main">
              <CommunityPosts
                loggedIn={loggedIn()}
                createNewPost={createNewPost}
                isUserCommunity={isUserCommunity}
                currentCommunity={community}
                userCommunities={user}
                unfollowCommunity={unfollowCommunity}
                followCommunity={followCommunity}
                posts={posts}
              />
            </div>
            <div></div>
          </div>
          <div className="footer"></div>
        </div>
      );
    } catch (e) {
      return <NotFound communityName={params.communityName} />;
    }
  } else {
    /* if no parameters are in the url then a Landing page is loaded with default posts*/

      landingPage()

    return (
      <div className="home">
        <div>
          <Navbar logout={props.logout} loggedIn={loggedIn()} />
        </div>
        <div class="wrapper">
          <div class="sidebar">
            <Sidebar
              loggedIn={loggedIn()}
              createCommunity={createCommunity}
              userCommunities={userCommunities}
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
