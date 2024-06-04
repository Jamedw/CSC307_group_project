import mongoose from "mongoose";
import dotenv from "dotenv"

/*put the connection into a seprate file and call it in backend.js */
dotenv.config()

mongoose.set("debug", true);
mongoose   
	.connect(process.env.MONGODB_URI)   
	.catch((error) => console.log(error));  