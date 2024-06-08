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
  return communityModel.find({name: name});
}

async function addCommunity(community){
  const commToAdd = new communityModel(community);
  return commToAdd.save();
}

async function getCommunitiesWLimit(limit){
  return communityModel.find({}, null, {limit: limit});
}

async function searchCommunityByTerm(searchTerm, limit){
  return communityModel.find({name: {$regex: new RegExp(searchTerm, 'i')}},
  null, {limit: limit});
}



export {
  findCommunityById,
  findCommunityByName,
  addCommunity,
  getCommunitiesWLimit,
  searchCommunityByTerm
}