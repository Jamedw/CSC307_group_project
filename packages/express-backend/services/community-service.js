import mongoose from "mongoose";
import communityModel from "../models/community.js";
import dotenv from "dotenv"

dotenv.config()

mongoose.set("debug", true);
mongoose   
	.connect(process.env.MONGODB_URI)   
	.catch((error) => console.log(error));  


async function findCommunityById(id){
  return communityModel.findById(id);
}

async function findCommunityByName(name){
  return userModel.find({name: name});//name
}
//todo a fetch funciton that returns {name: ,memberCount: ,postIds: }

/*todo a post function that creates a community this should be
  {name: required, memberCount: default val, postIds: default val}
  and this should utilize an authorization token
  
AUTHENICATION NEEDED FOR THIS
use tokens*/

/*todo a patch/post funciton that is used to update the member count
when a person joins a community

AUTHENICATION NEEDED FOR THIS
use tokens*/

/*todo a patch/post function that is used to update the postIds
when a new post in the community is made

AUTHENICATION NEEDED FOR THIS 
use tokens*/