import mongoose from "mongoose";
import userModel from "../models/users.js";
import dotenv from "dotenv"

async function findUserById(id) {
	return userModel.findById(id); 
}

async function addUser(user) {
	const userToAdd = new userModel(user);	
	return userToAdd.save();
}  


async function findUserByName(username){
    return userModel.find({username: username}) 
}


export {
    findUserById,
    findUserByName,
    addUser
}