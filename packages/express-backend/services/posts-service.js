import mongoose from "mongoose";
import postsModel from "../models/posts.js";
import dotenv from "dotenv"

dotenv.config()

mongoose.set("debug", true);
mongoose   
	.connect(process.env.MONGODB_URI)   
	.catch((error) => console.log(error));  


async function findPostByTitle(title){
	return postsModel.find({postTitle : title});
}

async function findPostById(id){
	return postsModel.findById(id);
}

async function addPost(post){
	const postToAdd = new postsModel(post);
	return postToAdd.save();
}
/*NOTE THAT FOR ALL THESE TODO IGNORE THE AUTHENTICATION PART
BECAUSE THAT IS TAKEN CARE ELSE WHERE AND FOR AN QUERY JUST RETRUN
THE WHOLE OBJECT FOR NOW. DONT WORRY ABOUT LEAVING ANYTHONG OUT
FOR NOW*/

/*TODO make a function that returns all fields of a Post document
except the commentIds. This function will be just to display the post
i.e when you see a post on the home page*/

/*TODO make a function that  returns all the fields of a Post document.
NOTE: we should not be returning a list of comment ids instead it should
be a returning an array of comments where each comment is
{username: ..., content: ...}*/

/*TODO make a post funciton that will create a post. Look at schema to
see what fields are required and which ones will have a defualt value.

AUTHENICATION NEEDED FOR THIS 
use tokens*/

/*TODO make a post/patch function that will allow for an addtion of a 
comment id to the commentIds fields 

AUTHENICATION NEEDED FOR THIS 
use tokens*/


export {
	findPostByTitle,
	findPostById,
	addPost
}