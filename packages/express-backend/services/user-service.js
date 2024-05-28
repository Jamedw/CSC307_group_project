import mongoose from "mongoose";
import postsModel from "../models/users.js";
import dotenv from "dotenv"

async function findUserById(id) {
	return await userModel.findById(id); 
}  

async function getUserComments(id){
    user = findUserById(findUserById(id))
    commentArray = user[0]
}

async function getUserPosts(id){

}

async function getUserCommunities(id){

}


export {
    findUserById
}