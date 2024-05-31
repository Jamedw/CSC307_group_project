import express from "express";
import cors from "cors";
import { registerUser, authenticateUser, loginUser } from "./auth.js"; // Import the functions from auth.js
import { addComment } from "./services/comment-service.js";
import "./services/connect.js"
import User from "./models/users.js";
import Posts from "./models/posts.js";
import Comment from "./models/comment.js";
import Community from "./models/community.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());



// Endpoint to verify login
app.post("/Login", loginUser);

// Endpoint to handle signup
app.post("/Signup", registerUser);


app.post("/comment", authenticateUser, (req, res) => {
  const commentAdd = req.body;
  addComment(commentAdd).then((result) =>
    res.status(201).send(result)
  );
});

app.post("/user/comment", authenticateUser)



// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
