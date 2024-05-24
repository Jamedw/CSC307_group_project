import mongoose from "mongoose";
import commentModel from "../models/comment.js";
import dotenv from "dotenv"

dotenv.config()

mongoose.set("debug", true);
mongoose   
	.connect(process.env.MONGODB_URI)   
	.catch((error) => console.log(error));  

/*TODO Make a fetch request for to fetch a comment by their id and
returns {userId: ..., userName: ...., content: ....}*/

/*TODO Make a post to create a comment. Required fields are userName
and content.

AUTHENICATION NEEDED FOR THIS 
use tokens*/