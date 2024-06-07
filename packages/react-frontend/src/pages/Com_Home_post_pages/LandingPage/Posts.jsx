import React, { useEffect, useState } from 'react';
import './Post.css';
import { NavLink, redirect, useNavigate, useParams } from 'react-router-dom';
import { white } from 'color-name';


function TableBody(props) {
 if(props.posts === "" || props.posts === undefined){
  return(<div></div>)
 } else {
  const communities = props.posts.map(community => {
    var communityname = community.name
    var encodedCommunityName = encodeURI(communityname)
    return community.pstTtlArr.map(title =>
      {
        var encodedpostTitle = encodeURI(title)
        return (      
        <div className="post">
        <NavLink to={'/' + encodedCommunityName}>C/ {communityname}</NavLink>
        <div className="title"></div>
        <NavLink
          style={{ color: 'white', fontSize: '20px' }}
          to={encodedCommunityName + '/' + encodedpostTitle}>
            {title}
        </NavLink>
      </div>)
      })

  });

  return <div>{communities}</div>;
 }
  
}

function Posts(props) {
  return (
    <TableBody
      posts={props.posts}
    />
  );
}

export default Posts;
