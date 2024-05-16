import Sidebar from "./Sidebar";
import React, {useState} from "react";
import Posts from "./Posts"
import Navbar from "./componets/Navbar";
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
            </div>
            
            <div className="footer">
                test
            </div>
        </div>
    );
  };
  
  
  export default Home;