import Sidebar from './componets/Sidebar';
import React, { useState } from 'react';
import Posts from './componets/Posts';
import Comments from './componets/Comments';
import Navbar from './componets/Navbar';
import './Home.css';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../images/stanchevmeme.png';

function Home() {
  let params = useParams();
  console.log(params);

  const [communities, setCommunities] = useState([
    { communityName: 'myCommunity', posts: ['firstpost', 'post?'] },
    { communityName: 'myCommunity2', posts: ['firstpost', 'test1'] },
    { communityName: 'myCommunity3', posts: ['firstpost', 'test1'] },
    { communityName: 'myCommunity4', posts: ['test', 'test1'] },
  ]);

  function addUserCommunity(community) {
    setUserCommunites([community, ...userCommunities]);
  }

  function unfollowCommunity(index) {
    const updated = userCommunities.filter(community => {
      return index.communityName !== community.communityName;
    });
    setUserCommunites(updated);
  }

  const [userCommunities, setUserCommunites] = useState([
    { communityName: 'myCommunity' },
    { communityName: 'myCommunity2' },
    { communityName: 'myCommunity3' },
    { communityName: 'myCommunity4' },
    { communityName: 'myCommunity5' },
    { communityName: 'myCommunity6' },
    { communityName: 'myCommunity7' },
  ]);

  function submitComment(comment) {
    console.log(comment);
    setComments([comment, ...comments]);
  }

  function createCommunity(community) {
    setUserCommunites([
      { communityName: community.communityName },
      ...userCommunities,
    ]);
    setCommunities(community, ...communities);
  }

  const [posts, setPosts] = useState([
    {
      profile: 'test',
      community: 'test1',
      header: 'test',
    },
    {
      profile: 'test',
      community: 'test2',
      header: 'test',
    },
    {
      profile: 'test',
      community: 'test3',
      header: 'test',
    },
    {
      profile: 'test',
      community: 'test4',
      header: 'test',
    },
    {
      profile: 'test',
      community: 'test5',
      header: 'test',
    },
    {
      profile: 'test',
      community: 'test6',
      header: 'test',
    },
    {
      profile: 'test',
      community: 'test',
      header: 'test',
    },
  ]);

  const [post] = useState({
    header: 'this is a post header',
    text: 'test',
    likes: 0,
    dislikes: 0,
  });

  const [comments, setComments] = useState([
    {
      text: 'test',
      likes: 0,
      dislikes: 0,
    },
    {
      text: 'test',
      likes: 0,
      dislikes: 0,
    },
    {
      text: 'test',
      likes: 0,
      dislikes: 0,
    },
    {
      text: 'test',
      likes: 0,
      dislikes: 0,
    },
    {
      text: 'test',
      likes: 0,
      dislikes: 0,
    },
    {
      text: 'test',
      likes: 0,
      dislikes: 0,
    },
  ]);

  const [login, setLogin] = useState(true);

  function search(array, searchValue) {
    for (let i = 0; i < array.length; i++) {
      const value = array[i].communityName;
      if (value === searchValue) {
        return true;
      }
    }

    return false;
  }

  //  if(params.communityName){
  //   if(!search(communities, params.communityName)){
  //     useNavigate("*")
  //   }
  //  }

  //if the url contains /community/post
  //then the body of home has to load comments which is slightly
  //different then regulat post
  if (params.postHeader) {
    return (
      <div className="home">
        <div>
          <Navbar />
        </div>
        <div class="wrapper">
          <div class="sidebar">
            <Sidebar
              login={login}
              createCommunity={createCommunity}
              userCommunities={userCommunities}
            />
          </div>
          <div class="main">
            <Comments
              postData={post}
              commentData={comments}
              submitComment={submitComment}
            />
          </div>
          <div></div>
        </div>
        <div className="footer">test</div>
      </div>
    );
  } else {
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
              login={login}
              createCommunity={createCommunity}
              userCommunities={userCommunities}
            />
          </div>
          <div class="main">
            <Posts
              userCommunities={userCommunities}
              searchData={params}
              postData={posts}
              addUserCommunity={addUserCommunity}
              unfollowCommunity={unfollowCommunity}
            />
          </div>
          <div></div>
        </div>
        <div className="footer">test</div>
      </div>
    );
  }
}

export default Home;
