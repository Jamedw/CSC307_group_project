// users.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  job: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;