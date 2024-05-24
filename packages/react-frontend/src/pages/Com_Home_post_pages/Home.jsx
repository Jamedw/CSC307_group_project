import Sidebar from "./componets/Sidebar";
import React, {useState} from "react";
import Posts from "./componets/Posts"
import Comments from "./componets/Comments"
import Navbar from "./componets/Navbar";
import "./Home.css"
import { useParams } from "react-router-dom";
import logo from "../images/stanchevmeme.png"

function Home() {

    let params = useParams();
    console.log(params)

    const [userCommunities, setUserCommunites] = useState([
        {communityName: "myCommunity"},
        {communityName: "myCommunity"},
        {communityName: "myCommunity"},
        {communityName: "myCommunity"},
        {communityName: "myCommunity"},
        {communityName: "myCommunity"},
        {communityName: "myCommunity"},
    ])

    function updateComments(comment) 
    {
        setComments([...comments, comment]);
    }

    const [posts, setPosts] = useState([{
        profile: "test",
        community: "test1",
        header: "test"
    },{
        profile: "test",
        community: "test2",
        header: "test"
    },{
        profile: "test",
        community: "test3",
        header: "test"
    },{
        profile: "test",
        community: "test4",
        header: "test"
    },{
        profile: "test",
        community: "test5",
        header: "test"
    },{
        profile: "test",
        community: "test6",
        header: "test"
    },{
        profile: "test",
        community: "test",
        header: "test"
    }
    ]);

    function updateList(post) 
    {
        setPosts([...posts, post]);
    }

    const [post] = useState([{
        header : "this is a post header",
        text: "test",
        likes: "test1",
        dislikes: "test"
    },]);

    const [comments, setComments] = useState([{
        text: "test",
        likes: "test1",
        dislikes: "test"
    },{
        text: "test",
        likes: "test1",
        dislikes: "test"
    },{
        text: "test",
        likes: "test1",
        dislikes: "test"
    },{
        text: "test",
        likes: "test1",
        dislikes: "test"
    },]);
    //if the url contains /community/post
    //then the body of home has to load comments which is slightly 
    //different then regulat post
    if(params.postHeader){
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
                        <Comments postData={post} commentData={comments}/>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="footer">
                    test
                </div>
            </div>
        );
    } else{
            //if the url has / or /community loading post is the same the 
    // community page only has a community

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
    }
  };
  
  
  export default Home;