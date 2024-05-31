import {React , useState} from "react";

import Popup from "reactjs-popup";

function Addcommunitybutton(props) {

    const [post, setPost] = useState(
        {
            profile: '',
            community: '',
            header: '',
          }
    );

    const handleheaderchange = event => {
        setPost({
            profile: '',
            community: '',
            header: '',
          });
      };
  
    const handletextchange = event => {
      setPost(        {
        profile: post.profile,
        community: '',
        header: '',
      });
    };

  
    function resetCommunity() {
      setCommunityName({
        communityName: '',
        post: [],
      });
    }

    return (
      <Popup
        onClose={() => {
          resetCommunity;
        }}
        contentStyle={{
          opacity: 1,
        }}
        overlayStyle={{
          backgroundColor: `rgba(0,0,0,.5)`,
        }}
        trigger={
          <button role="button" className="createCommunityTab">
            Create New Post
          </button>
        }
        modal
        nested>
        {close => (
          <div className="modal">
            <div>Community Name:</div>
            <div className="content">
              <div>
                <textarea
                  name="commenttext"
                  
                  id=""
                  cols="40"
                  rows="10"
                  style={{ margin: 10 }}></textarea>
              </div>
            </div>
            <div>
              <button
                class="button-2"
                onClick={() => {
                  close();
                }}
                role="button">
                
              </button>
            </div>
          </div>
        )}
      </Popup>
    )
  }

  export default Addcommunitybutton