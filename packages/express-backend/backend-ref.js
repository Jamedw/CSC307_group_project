/*THIS FILE IS ONLY HERE FOR REFERENCE AND SHOULD NEVER BE CALLED*/

/*THIS FILE IS ONLY HERE FOR REFERENCE AND SHOULD NEVER BE CALLED*/

/*THIS FILE IS ONLY HERE FOR REFERENCE AND SHOULD NEVER BE CALLED*/

/*THIS FILE IS ONLY HERE FOR REFERENCE AND SHOULD NEVER BE CALLED*/






import express from "express";
import cors from "cors";
import { registerUser, authenticateUser, loginUser } from "./auth.js"; // Import the functions from auth.js
import User from "./models/users.js";
import {   
	addUser,   
	getUsers,   
	findUserById,   
	findUserByName,   
	findUserByJob,
  findUserByNameAndJob,
  findUserByIdAndDelete,
} from "./services/user-service.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

/* // Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/users_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err)); */

app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});

// Endpoint to verify login
app.post("api/Login", loginUser);

// Endpoint to handle signup
app.post("api/Signup", registerUser);


// Endpoint to retrieve all users
app.get("api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to retrieve a user by their ID
app.get("api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to add a new user
app.post("/apiusers", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  Users.addUser(userToAdd).then((result) =>
    res.status(201).send(result)
  );
});

// Endpoint to delete a user by their ID
app.delete("api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.send(deletedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
