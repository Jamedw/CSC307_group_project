import express from "express";
import cors from "cors";
import { registerUser, authenticateUser, loginUser } from "./auth.js"; // Import the functions from auth.js
import { addComment, findCommentById} from "./services/comment-service.js";
import { findUserById } from "./services/user-service.js";
import { findPostByTitle, findPostById, addPost,
         getPostWLimit, searchPostByTerm} from "./services/posts-service.js";
import { findCommunityById, findCommunityByName,
addCommunity, getCommunitiesWLimit, searchCommunityByTerm } from "./services/community-service.js";
import "./services/connect.js"
import User from "./models/users.js";
import Posts from "./models/posts.js";
import Comment from "./models/comment.js";
import Community from "./models/community.js";
import { Db, ObjectId } from "mongodb";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Start the server
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});

// Endpoint to verify login
app.post("/Login", loginUser);

// Endpoint to handle signup
app.post("/Signup", registerUser);


// examples ---------------------------------------


/*Not sure if this will actually be used. This is only
really here to reference for authentication*/
app.post("/comment", authenticateUser, (req, res) => {
  const commentAdd = req.body;
  addComment(commentAdd).then((result) =>
    res.status(201).send(result)
  );
})

// examples done --------------------------------------



//get collection by id ----------------------------------

//function will be used for the community ids
app.get("/user/:id", authenticateUser, async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = await findUserById(id);
  //console.log("endpoint called");
  if (result === undefined) {
    //console.log("got here");
    res.status(404).send("Resource not found.");
  } else {
    let communityArr = [];
    for(let i = 0; i < result.communityIds.length; i++){
      communityArr.push(await findCommunityById(result.communityIds[i]));
    }
    res.status(201).send({communityArr: communityArr});
  }
});


/*get a post by id */
app.get("/post/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await findPostById(id);
  if (!result){
    res.status(404).send("No post with given id found");
  }
  else{
    res.status(201).send(result);
  }
})

/*get a community by id */
app.get("/community/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await findCommunityById(id);
  if (!result){
    res.status(404).send("No community with given id found");
  }
  else{
    res.status(201).send(result);
  }
})

/*get a comment by id*/
app.get("/comment/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await findCommunityById(id);
  if (!result){
    res.status(404).send("No comment with given id found");
  }
  else{
    res.status(201).send(result);
  }
})
// -------------------------------------------------------------



// create a post, comment, community -----------------------------------------------



//for when a usser creates a community
/*expected data;
userId: id of user who created the community
name: name of the created community
*/
/*
If the community name exists no community will be created 
and it will send the appropriate http code. Otherwise, 
the community will be created and the community id will be added
to the user's communityIds.
*/
app.post("/user/community", authenticateUser, async (req, res) => {
  const {userId, name} = req.body;
  if(!userId || !name){
    res.status(400).send("Bad request: Invalid input data");
  }else{
    const resComm = await findCommunityByName(name);
    console.log("after comm lookup")
    if (resComm.length !== 0 || !(await findUserById(userId))){
      res.status(409).send("Community taken already");
    } else{
      const createdComm = await addCommunity({name: name});
      const result = await User.findByIdAndUpdate(userId,
        {'$push': {communityIds : createdComm._id}},
        { new: true,
          upsert: true});
      res.status(201).send(createdComm);
    }
  }
})




//for when a user creates a post
/* expected data;
userId: id of user that created the post
communityId: community the post is a part of
postTitle: title of the created post
postContent: the content of the created post
*/
/*
if the user postTitle exists within the community pstTtlArr
then the post will not be created and the appropriate http error
code will be sent. Otherwise, the post is created and we add the 
new created postId to the community's postIds array and to the users
postIds array. Furthermore, we will add the postTitle to the community's
pstTtlArr.
*/
/*TODO
make sure the post title isn't within the post's pstTtlArr*/
app.post("/user/post", authenticateUser, async (req, res) => {
  const {userId, communityId, postTitle, postContent} = req.body;
  if (!userId || !communityId || !postTitle || !postContent){
    res.status(400).send("Bad Request: Missing data fields");
  } else{
      const userRes = await findUserById(userId);
      const communityRes = await findCommunityById(communityId);
      if(!userRes || !communityRes){
        res.status(404).send("Couldn't find a community/user with given ids")
      }else{
        let postTtlExists =  false;
        for(let i = 0; i < communityRes.pstTtlArr.length; i++){
          if(postTitle === (communityRes.pstTtlArr)[i]){
            postTtlExists = true;
          }
        }
        if(postTtlExists){
          res.status(409).send("Post with this title already exists in the community");
        }else{
          const createdPost = await addPost({postTitle: postTitle, postContent, postContent});
          await User.findByIdAndUpdate(userId,
            {'$push': {postIds : createdPost._id}},
            { new: true,
              upsert: true});
          await Community.findByIdAndUpdate(communityId,
            {'$push': {postIds : createdPost._id}},
            { new: true,
              upsert: true});
          await Community.findByIdAndUpdate(communityId,
            {'$push': {pstTtlArr : postTitle}},
            { new: true,
              upsert: true});
          res.status(201).send(createdPost);
        }
      }
  }
})


//for when a user creates a comment
/*expected data;
userId: id of user who created the post
postId: post the comment is a part of
username: username of user who created the post
content: the comment of the user
*/
/*
the comment will be created and the comment id will be added to the post's
commentIds array and to the user's commentIds array
*/
app.post("/user/comment", authenticateUser, async (req, res) => {
  const {userId, postId, username, content} = req.body;
  if(!userId || !postId || !username || !content){
    res.status(400).send("Bad request: Invalid input data");
  }
  else{
    try{
      const userRes = await findUserById(userId);
      const postRes = await findPostById(postId);
      if(!userRes || ! postRes){
        res.status(400).send("Bad request: Invalid postId or userID");
      } else{
        const createdComment = await addComment({username: username, content: content});
        await Posts.findByIdAndUpdate(postId,
          {'$push': {commentIds : createdComment._id}},
          { new: true,
            upsert: true});
        await User.findByIdAndUpdate(userId,
          {'$push': {commentIds : createdComment._id}},
          { new: true,
            upsert: true});
        res.status(201).send(createdComment);
      }
    }catch (error){
      res.status(401).send("bad user id or post id");
    }
    
  }
})



// ----------------------------------------------------------------------


// follow and unfollow a community ----------------------------------------
//for these functions just check status code === 201 for success

//check if the approiate fields and their realted collection exist
//function needs to increment the community member count approriately
//check if the user is already part of the community
app.post("/community/follow", authenticateUser, async (req, res) => {
  const {userId, communityId} = req.body;
  if(!userId || !communityId){
    res.status(400).send("follwing a community requires a userId and a communityId");
  }else{
    const userRes = await findUserById(userId);
    const commRes = await findCommunityById(communityId);
    if(!userRes || !commRes){
      res.status(404).send("A user or community with the given ids could not be found");
    }
    let i = 0;
    let notFollowing = true;
    for(; i < userRes.communityIds.length ; i++){
      if((userRes.communityIds)[i] === communityId){
        notFollowing = false;
        break;
      }
    }
    if(notFollowing){
      //update user array
      const userUpdate = await User.findByIdAndUpdate(userId,
        {'$push': {communityIds : communityId}},
        { new: true,
          upsert: true});
      //increment community member count
      const communityUpdate = await Community.findByIdAndUpdate(communityId,
        {'$inc': {memberCount: 1}},
        { new: true,
          upsert: true});
      res.status(201).send({update: true});
    }else{
      res.status(409).send("The user already follows the community");
    }
  }
})



app.post("/community/unfollow", authenticateUser, async (req, res) =>{
  const {userId, communityId} = req.body;
  if(!userId || !communityId){
    res.status(400).send("follwing a communit requires a userId and a communityId");
  }else{
    const userRes = await findUserById(userId);
    const commRes = await findCommunityById(communityId);
    if(!userRes || !commRes){
      res.status(404).send("A user or community with the given ids could not be found");
    }
    let i = 0;
    let Following = false;
    for(; i < userRes.communityIds.length ; i++){
      if((userRes.communityIds)[i] === communityId){
        Following = true;
        break;
      }
    }
    if(Following){
      //update user array by popping off community id
      console.log(userRes);
      console.log(commRes);
      const userUpdate = await User.updateOne(
        { _id: userId},
        { $pull: {communityIds: communityId}}
      );
      //decrement community member count
      const communityUpdate = await Community.findByIdAndUpdate(communityId,
        {'$inc': {memberCount: -1}},
        { new: true,
          upsert: true});
      res.status(201).send({update: true});
    }else{

      res.status(409).send("The user does not follow the community");
    }

  }
})

// --------------------------------------------------------------------------

// find something by name -----------------------------------------------------
//getPostByCommunityPostName
//send back community id, post detail, and post comments
app.get("/communityName/:commName/:postName", async (req, res) => {
  const commName = decodeURI(req.params["commName"]);
  const postName = decodeURI(req.params["postName"]);
  console.log(commName);
  console.log(postName);
  const communityRes = await findCommunityByName(commName);
  if(communityRes.length === 0){
    res.status(404).send("The given community/post could not be found");
  }else{
    const comm = communityRes[0];
    let i = 0;
    let found = false;
    for (; i < comm.pstTtlArr.length; i++){
      if((comm.pstTtlArr)[i] === postName){
        found = true;
        break;
    }}

    if(found === false){
      res.status(404).send("The given community/post could not be found");
    }else{
      const postRes = await findPostById((comm.postIds)[i]);
      let commArr = []
      for (let i = 0; i < postRes.commentIds.length; i++){
        commArr.push(await findCommentById((postRes.commentIds)[i]));
      }
      res.status(201).send({comments: commArr,
                            post: postRes,
                            communityId: comm._id});
    }
  }
})


//done ... frontend function: 
//this function is to retrieve a community by name
//it will return the community information and all the post
//information for each post in the postIds array
/*format {community : communityObject
          postsArr : [array of post objects]}*/
app.get("/communityName/:name", async (req, res) => {
  let name = req.params["name"];
  name = decodeURI(name);

  console.log(name);
  const resCommunity = await findCommunityByName(name);
  const resComm = await User.findOne({name: name});
  console.log(resComm);
  if (!(resCommunity.length)){
    res.status(404).send(`no coummunity with name \"${name}\" found`);
  }
  else{
    //console.log(resCommunity);
    let postArr = [];
    const resCommPostIds = resCommunity[0].postIds;
    //console.log(resCommPostIds);
    for (let i = 0; i < resCommPostIds.length ; i++){
      postArr.push(await findPostById(resCommPostIds[i]));
    }
    //add the community posts later 
    res.status(201).send({community : resCommunity[0],
                          postsArr: postArr})
  }
})


//searching for the home and post page -------------------------------------------------------
//this is for the home page
app.get("/search/home", async (req, res) => {
  const posts =  await getPostWLimit(3);
  const communities = await getCommunitiesWLimit(3);
  res.status(201).send({posts: posts,
                        communities: communities});
})

app.get("/search/home/:searchBy", async (req, res) => {
  const searchTerm = decodeURI(req.params["searchBy"]);
  console.log(searchTerm);
  const community = await searchCommunityByTerm(searchTerm, 3);
  const post = await searchPostByTerm(searchTerm, 3);
/*   let commRes = undefined;
  let postRes = undefined;
  if(community.length){
    commRes = community[0];
  }
  if(post.length){
    postRes = post[0];
  }
  console.log(community);
  console.log(post); */
  res.status(201).send({community: community,
                        post: post})
})

//for when you just open up a community page
app.get("/search/post/:communityName", async (req, res) =>{
  const communityName = req.params["communityName"];
  const resCommunity = await findCommunityByName(communityName);
  if(resCommunity.length == 0){
    res.status(404).send("No community with given name");
  } else {
    const community = resCommunity[0]
    let postArr = [];
    for (let i = 0; i < community.pstTtlArr.length && i < 3; i++){
      postArr.push(await findPostById(community.postIds[i]));
    }
    res.status(201).send({posts : postArr});
  }
})


app.get("/search/post/:communityName/:searchTerm", async (req, res) =>{
  const communityName = decodeURI(req.params["communityName"]);
  const searchTerm = decodeURI(req.params["searchTerm"]);

  const resCommunity = await findCommunityByName(communityName);

  if(resCommunity.length == 0){
    res.status(404).send("No community with given name");
  } else {
    const community = resCommunity[0]
    let postArr = [];
    for (let i = 0; i < community.pstTtlArr.length && postArr.length < 3; i++){
      if(community.pstTtlArr[i].toUpperCase().includes(searchTerm.toUpperCase())){
        postArr.push(await findPostById(community.postIds[i]));
      } 
    }
    res.status(201).send({posts : postArr});
  }
})
// ------------------------------------------------------------------------------------------





















//These functions will not be used because the like/dislikeing has been scrapped


//for when a user likes a post
/*expected data
userId: the id of the user
postId: the post of the id 
*/ 
app.post("/post/like", authenticateUser, (req, res) => {
  const {userId, postId} = req.body;
  if(!userId || !postId){
    res.status(400).send("Request body must include a User and community id")
  }else{
    const userRes = findUserById(userId);
    const postRes = findPostById(postId);
    if(!userRes || !postRes){
      res.status(404).send("Couldn't find a user/post with givern userId/postId");
    }else{

    }
  }
})



//for when a user dislikes a post
/*  EXPECTED DATA
userId: the id of the user
postId: the post of the id 
*/
/*  HOW IT WORKS
if the user wants to dislike a post we will check if they are in the dislkUser
array. If they are we don't add to the downVotes and send the appropriate error
code, else we will add their id tothe dislkUserIds and update teh downVote counter.
Note that we should also update the upVote count if they have upVoted the post
*/
/*  RETURN OBJECT?
{dwnVtAdd : boolean, upVtChng : boolean} 
dwnVtAdd=true will signifies that we added to the array (Note will still
  have to sen and error code).
upVtChng=true signifies that the user had previously upVoted the post
and that 
*/
/*
app.post("/post/dislike", authenticateUser, (req, res) => {

}
*/




