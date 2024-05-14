
import React, {useState} from "react";
import "./Post.css"

function TableBody(props)
{
  const rows = props.postData.map(
    (post, index) => 
    {
      return (
 
        <div className="post">

          if ({post.img} !== undefined)

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
