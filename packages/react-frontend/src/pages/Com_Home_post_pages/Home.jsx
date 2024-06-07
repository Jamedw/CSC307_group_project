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
  let API_PREFIX = 'api/rbb-web-app-api.azurewebsites.net';
  const INVALID_TOKEN = 'INVALID_TOKEN';
  const token = props.token;
  const [user, setUser] = useState('');
  const [userCommunities, setUserCommunities] = useState('');
  const [communities, setCommunities] = useState([]);
  const [community, setCommunity] = useState('');
  const [communityPosts, setCommunityPosts] = useState([]);
  const [posts, setPosts] = useState('');
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [params, setParams] = useState("")
  if (params !== useParams()){
    setParams(useParams());
  }

  function loggedIn() {
    if (token === INVALID_TOKEN) {
      return false;
    } else {
      return true;
    }
  }

  useEffect(()=>{
    setUser(props.user);
  },[props.user])

  
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
    const promise = fetch(`${API_PREFIX}/search/home`)
      .then(response => {
        if (response.status === 304) {
          response.json().then(payload => {
            setPosts(payload.communities);
          });
        } else {
          response.json().then(payload => {
            setPosts(payload.communities);
          });
        }
      })
      .catch(error => {});
    return promise;
  }
  function initlanding() {
    landingPage();
  }

  function landingPageSearch(input){
    const promise = fetch(`${PREFIX}/search/home/${encodeURI(input)}`)
      .then(response => {
        if (response.status === 304) {
          response.json().then(payload => {
            setPosts(payload.community);
          });
        } else {
          response.json().then(payload => {
            setPosts(payload.community);
          });
        }
      })
      .catch(error => {});
    return promise;
  };

  function communitySearch(input){
    const promise = fetch(`${PREFIX}/search/post/${encodeURI(community.name)}/${encodeURI(input)}`)
    .then(response => {
      if (response.status === 304) {
        response.json().then(payload => {

          setCommunityPosts(payload.posts);
        });
      } else {
        response.json().then(payload => {
          setCommunityPosts(payload.posts);
        });
      }
    })
    .catch(error => {});
  return promise;
  }

  function search(searchterm){
    if (params.communityName === undefined){
      if(searchterm === "" || searchterm === undefined){
        initlanding()
      } else{
        landingPageSearch(searchterm)
      }

    } else if (params.communityName && !params.postHeader){
      if(searchterm === "" || searchterm === undefined){
        initCommunity(community.name)
      } else{
        communitySearch(searchterm)
      }
    } else{

    }
    
  };

  //userId and name
  //returns
  function postCommunity(input) {
    const promise = fetch(`${PREFIX}/user/community`, {
      method: 'POST',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(input),
    }).then(response => {
      if (response.status === 304) {
        response.json().then(payload => {
          setUserCommunities([payload, ...userCommunities]);
        });
      } else {
        response.json().then(payload => {
          setUserCommunities([payload, ...userCommunities]);
        });
      }
    })
    .catch(error => {});

    return promise;
  }

  function createCommunity(community) {
    postCommunity({
      userId: user._id,
      name: community.name,
    });
  }

  //fields needed: userId and communityId
  //returns:
  //{update: true}
  function follow(input) {
    const promise = fetch(`${PREFIX}/community/follow`, {
      method: 'POST',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(input),
    });

    return promise;
  }

  //fields needed: userId and communityId
  //returns: {update: true}
  function unfollow(input) {
    const promise = fetch(`${PREFIX}/community/unfollow`, {
      method: 'POST',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(input),
    });

    return promise;
  }

  function followCommunity(community) {
    follow({ userId: user._id, communityId: community._id });
    setUserCommunities([community, ...userCommunities]);
  }

  function unfollowCommunity(community) {
    unfollow({ communityId: community._id, userId: user._id });
    const updated = userCommunities.filter(
      currentcommunity => currentcommunity._id != community._id,
    );
    setUserCommunities(updated);
  }

  function postComment(input) {
    const promise = fetch(`${PREFIX}/user/comment`, {
      method: 'POST',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(input),
    });

    return promise;
  }

  function createComment(comment) {
    console.log(user._id, post._id, user.username, comment.content);
    postComment({
      userId: user._id,
      postId: post._id,
      username: user.username,
      content: comment.content,
    });
    setComments([comment, ...comments]);
  }


  function initCommunity(name) {
    getCommunityByname(encodeURI(name));
  }

  function getCommunityByname(communityName) {
    const promise = fetch(`${PREFIX}/communityName/${communityName}`)
      .then(response => {
        if (response.status === 304) {
          response.json().then(payload => {
            setCommunity(payload.community);
            setCommunityPosts(payload.postsArr);
          });
        } else {
          response.json().then(payload => {
            setCommunity(payload.community);
            setCommunityPosts(payload.postsArr);
          });
        }
      })
      .catch(error => {});
    return promise;
  }

  function isUserCommunity(community) {
    var flag = false
    userCommunities.forEach(element => {
      if(element._id === community._id){
        flag = true
      }
    });
    return flag
  }

  function initPost(communityName, postName) {
    getPostbyCommunityPostId(communityName, postName);
  }

  function getPostbyCommunityPostId(communityName, postName) {
    const promise = fetch(
      `${PREFIX}/communityName/${communityName}/${postName}`,
    )
      .then(response => {
        if (response.status === 304) {
          response.json().then(payload => {
            setPost(payload.post);
            setComments(payload.comments);
          });
        } else {
          response.json().then(payload => {
            setPost(payload.post);
            setComments(payload.comments);
          });
        }
      })
      .catch(error => {});
    return promise;
  }

  function getPostCommments(post) {
    return comments.filter(comment => post.comments.includes(comment.id));
  }

  //needs a userId, communityid, postTitle, postContent
  function postPost(input) {
    const promise = fetch(`${PREFIX}/user/post`, {
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
    setCommunityPosts([post, ...communityPosts]);
  }

 

  /*The parameters of the url determine what is loaded in the main div 'main'
  If the communityName and a postHeader is present a search for a post must be done by community name and 
  post header, the post information is need so that when a new comment is create the comment can be linked to the
  associated Post, also we need to post information such as the post.Header, post.content, likes and dislikes*/

  /* An important aspect of the design is that all that changes is what is in the "main" div, the sidebar and navbar can be reused
  all that changes is what is in the "main" div*/
  if (params.communityName && params.postHeader) {
    useEffect(() => {
      initPost(params.communityName, params.postHeader);
    }, [params]);
    try {
      return (
        <div className="home">
          <div>
            <Navbar search={search} logout={props.logout} loggedIn={loggedIn()} />
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
    useEffect(() => {
      initCommunity(params.communityName);
    }, [params]);

    try {
      return (
        <div className="home">
          <div>
            <Navbar search={search} logout={props.logout} loggedIn={loggedIn()} />
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
                posts={communityPosts}
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
    try {
      useEffect(() => {
        initlanding();
      }, [params]);
  
      return (
        <div className="home">
          <div>
            <Navbar search={search} logout={props.logout} loggedIn={loggedIn()} />
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
              <Posts posts={posts} />
            </div>
            <div></div>
          </div>
          <div className="footer"></div>
        </div>
      );
    } catch (e) {
      return <NotFound />;
    }
  }
}

export default Home;
