
import React, {useState} from "react";
import "./Post.css"

function TableBody(props)
{
  const rows = props.postData.map(
    (post, index) => 
    {
      
      if (post.postimg !== undefined) {
        return (
          
          <div className="post">
            <a href={post.community}>
              {post.community}
            </a>
            <div className="img">
              <div>
                <img src={post.postimg}  />
              </div>
            </div>
            <div className="title">
              <div>
              <img src={post.postimg} style={{width:50, height: 50, borderRadius: 50}} />
              </div>
              <div>
                {post.username}
              </div>
            
            </div>
            <a >
              {post.header}
            </a>

            
          </div>
          );
      } 
      else
      {
        return (
          <div className="post">
            <a href={post.community}>
              {post.community}
            </a>
            <div className="title">
              <div>
                <button />
              </div>
              <div>
                <button />
              </div>
            </div>
            {post.header}
          </div>
          );
      }
    }
  );

   if (props.searchData.communityName && props.searchData.postHeader){
    return(
      <div>
        <div className="post">
        Welcome to the community!!!
        </div>
        {rows}
      </div>
    );
    }
  else if (props.searchData.communityName){
    return(
      <div>
        <div className="post">
        Welcome to the community!!!
        </div>
        {rows}
      </div>
    );
  }
  else {
    return(
      <div>
        {rows}
      </div>
    );
  }

}

function Posts(props)
{
    return (
      <TableBody searchData={props.searchData} postData={props.postData}/>
    );
}

export default Posts;
