import Sidebar from "./Sidebar";
import React, {useState} from "react";
import Posts from "./componets/Posts"
import Navbar from "./componets/Navbar";
import "./Home.css"
import logo from "./images/stanchevmeme.png"

function Home() {

    const [posts, setPosts] = useState([{
        profile: "test",
        header: "test"
    },
{postimg: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F52-525476_pepe-frog-rana-triste-sad-frog-meme-hd.png&f=1&nofb=1&ipt=e6fc08fed5b06537776741c520d85296f1afadf85b53c0018e4e46a8bd4137bd&ipo=images" ,
username: "frog man", userprofile:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F52-525476_pepe-frog-rana-triste-sad-frog-meme-hd.png&f=1&nofb=1&ipt=e6fc08fed5b06537776741c520d85296f1afadf85b53c0018e4e46a8bd4137bd&ipo=images" ,community: "thefrogmancommunity",
header: "frog man returns?"},{postimg: logo ,
username: "Lubomir Stanchev", userprofile: logo, community: "DBMSs",
header: "OMG!!! Yo stanchev is calling and its 3am"},{profile: "test",
header: "test"},{header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"},{profile: "test",
header: "test"}]);
    
    function updateList(post) 
    {
        setPosts([...posts, post]);
    }

    return (
        <div className="home">
           
            
            <div>
                <Navbar />
            </div>
            
            <div class="wrapper">
                <div class="sidebar">
                    <Sidebar />
                </div>
                <div class="main">
                    <Posts postData={posts}/>
                </div>
                <div>
                    
                </div>
            </div>
            
            <div className="footer">
                test
            </div>
        </div>
    );
  };
  
  
  export default Home;