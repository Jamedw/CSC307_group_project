/*this file is just here for reference 
and should not be called anywhere */



import mongoose from "mongoose";
import userModel from "../models/users.js";
import dotenv from "dotenv"

dotenv.config()

mongoose.set("debug", true);
mongoose   
	.connect(process.env.MONGODB_URI)   
	.catch((error) => console.log(error));  

async function getUsers(name, job) {
	let users;

	if (name && job) {
		users = await findUserByNameAndJob(name, job);   
    }
	else if (name && !job) {
		users = await findUserByName(name);   
	} else if (job && !name) {
		users = await findUserByJob(job);   
	}
    else {
        users = await userModel.find();
    }
	return users; 
}  

async function findUserById(id) {
	return await userModel.findById(id); 
}  

async function findUserByIdAndDelete(id) {
	return await userModel.findByIdAndDelete(id);
}

async function addUser(user) {
	const userToAdd = new userModel(user);	
	return await userToAdd.save();
}  

async function findUserByName(name) {
	return await userModel.find({ name: name }); 
}  

async function findUserByJob(job) {
	return await userModel.find({ job: job }); 
}  

async function findUserByNameAndJob(name, job) {
	return await userModel.find({ name: name, job: job });
}

export {   
	addUser,   
	getUsers,   
	findUserById,   
	findUserByName,   
	findUserByJob,
    findUserByNameAndJob,
    findUserByIdAndDelete,
};
