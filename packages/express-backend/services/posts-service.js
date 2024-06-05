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


async function getPostWLimit(limit){
	return postsModel.find({}, null, {limit: limit});
}


export {
	findPostByTitle,
	findPostById,
	addPost,
	getPostWLimit
}