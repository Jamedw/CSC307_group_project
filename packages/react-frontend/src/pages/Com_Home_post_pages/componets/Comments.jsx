
import React, {useState} from "react";
import "./Comments.css"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';



function TableBody(props)
{

  const postData = props.postData;

  const rows = props.commentData.map(
    (post, index) => 
    {    
        return (
          <div className="comment">
            <h1>
              {postData.header}
            </h1>
            <div>
              {postData.text}
            </div>
            <div className="interact">
              <div>
                <button>
                {postData.likes}
                </button>
              </div>
              <div>
                <button>
                {postData.dislikes}
                </button>
              </div>
            </div>
          </div>
          ); 
    }
  );


    return(
      <div>
        <div className="post">
          <h1>
            {postData.header}
          </h1>
          <div className="interact">
        <   div>
                <button>
                {postData.likes}
                </button>
              </div>
              <div>
                <button>
                {postData.dislikes}
                </button>
              </div>
              <div>
                <Popup trigger=
                {<button> Click to open modal </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                Welcome to GFG!!!
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
          </div>
        </div>
        {rows}
      </div>
    );
}


function Posts(props)
{
    return (
      <TableBody postData={props.postData} commentData={props.commentData}/>
    );
}



export default Posts;
