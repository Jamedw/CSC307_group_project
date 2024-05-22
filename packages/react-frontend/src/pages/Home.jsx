import Sidebar from "./Sidebar";
import React, {useState} from "react";
import Posts from "./componets/Posts"
import Navbar from "./componets/Navbar";
import "./Home.css"
import { useParams } from "react-router-dom";
import logo from "./images/stanchevmeme.png"

function Home() {

    let params = useParams();
    console.log(params)

    const [posts, setPosts] = useState([{
        profile: "test",
        header: "test"
    },
,{profile: "test",
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
                    <Posts searchData={params} postData={posts}/>
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