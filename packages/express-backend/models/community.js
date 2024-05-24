//community.js
import mongoose from "mongoose";


/*
When a community is created the user who created the community will
automatically be added to the member count.
*/
const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  memberCount: {
    type: Number,
    default: 1
  },
  postIds: {
    type: Array,
    default: []
  },
});

const Community = mongoose.model("Community", CommunitySchema);

export default Community;