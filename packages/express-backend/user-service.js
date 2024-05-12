import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);
mongoose   
	.connect("mongodb://localhost:27017/users", {
		useNewUrlParser: true,     
		useUnifiedTopology: true,   
	})   
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

export default User-service
export {   
	addUser,   
	getUsers,   
	findUserById,   
	findUserByName,   
	findUserByJob,
    findUserByNameAndJob,
    findUserByIdAndDelete,
};
