import bcrypt from "bcrypt";
import User from "./models/users.js"; // Import the User model

// Function to generate a unique ID
function generateUniqueId() {
  // Generate a unique ID using a suitable algorithm
  return "unique-id"; // Placeholder for actual unique ID generation logic
}

// Function to validate the email format
function validateEmail(email) {
  // Check if the email ends with @calpoly.edu
  return email.endsWith("@calpoly.edu");
}

// Function to validate the password format
function validatePassword(password) {
  // Define a regex pattern to match the required password format
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
}

// Function to hash the password
async function hashPassword(password) {
  // Generate a salt
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  // Hash the password using the salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// Function to verify login credentials
async function verifyLogin(usernameOrEmail, password) {
  // Check if the username or email exists in the database
  const user = await User.findOne({
    $or: [{ name: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!user) {
    return { success: false, message: "User not found" };
  }
  // Verify the password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Incorrect password" };
  }
  return { success: true, message: "Login successful" };
}

// Function to handle signup process
async function signup(name, email, password) {
  // Validate email format
  if (!validateEmail(email)) {
    return { success: false, message: "Invalid email format" };
  }
  // Validate password format
  if (!validatePassword(password)) {
    return { success: false, message: "Invalid password format" };
  }
  // Hash the password
  const hashedPassword = await hashPassword(password);
  // Check if the username already exists
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    return { success: false, message: "Username already exists" };
  }
  // Create a new user
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  return { success: true, message: "Signup successful" };
}

export { generateUniqueId, verifyLogin, signup };
