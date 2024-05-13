import Sidebar from "./Sidebar";
import logo from "./images/calpoly.png"
import React, {useState} from "react";
import Posts from "./Posts"
import "./Home.css"

function Home() {

    const [posts, setPosts] = useState([{
        profile: "test",
        header: "test"
    },
{profile: "test",
header: "test"},{profile: "test",
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
        <div>
           
            <div className="top-nav" >
                
            <div> 
                <a href="\">
                    <img src={logo} style={{height:50 ,borderRadius:50 ,width:50,marginBottom:-10}} alt="horsey" />
                </a>    
            </div>
            <div>
                <input name="Community_Post"            
        type="text"        
        placeholder="Search For Post or Community"
        className="input-field"/>
            </div>
            <div> 
                    <a href="/Login" >
                        <button>Log in</button>
                    </a>
            </div> 
               
            </div>

            <div class="wrapper">
                <div class="sidebar">
                    <Sidebar />
                </div>
                <div class="main">
                    <Posts postData={posts}/>
                </div>
            </div>
            
            <div className="footer">
                test
            </div>
        </div>
    );
  };
  
  
  export default Home;