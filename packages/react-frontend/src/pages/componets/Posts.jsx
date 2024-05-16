
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
  
            {post.header}
            <div>
            {post.community}
            </div>
            
          </div>
          );
      } 
      else
      {
        return (
 
          <div className="post">
  
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

  return(
    <div>
      {rows}
    </div>
  );
}

function Posts(props)
{


    return (
      <TableBody postData={props.postData}/>
    );

}

export default Posts;
