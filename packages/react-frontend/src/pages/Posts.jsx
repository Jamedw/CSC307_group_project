import { green } from "color-name";
import React, {useState} from "react";


function TableBody(props)
{
  const rows = props.postData.map(
    (post, index) => 
    {
      return (
 
        <div className="post">
          <h1>
          {post.profile}
          </h1>
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
