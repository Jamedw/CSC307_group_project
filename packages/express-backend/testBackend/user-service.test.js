// Import necessary modules and services
const { 
    findUserById, 
    findUserByName, 
    addUser 
} = require('../services/user-service');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userModel = require('../models/users');

// Load environment variables from the .env file
dotenv.config();

// Before all tests, connect to the MongoDB database
beforeAll(async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}, 20000); // 20-second timeout

// After all tests, close the MongoDB connection
afterAll(async () => {
    await mongoose.connection.close();
}, 20000); // 20-second timeout

// Test suite for the User Service
describe('User Service', () => {
    // Variable to store the ID of a user added during tests
    let userId;

    // Test case to check if a user can be added
    test('should add a user', async () => {
        // Define a sample user object
        const user = { username: 'testUser', password: 'testPassword' };
        
        // Call the addUser function to add the user to the database
        const savedUser = await addUser(user);
        
        // Store the ID of the saved user for use in other tests
        userId = savedUser._id;
        
        // Verify that the saved user is defined
        expect(savedUser).toBeDefined();
        
        // Verify that the username and password of the saved user match the expected values
        expect(savedUser.username).toBe('testUser');
        expect(savedUser.password).toBe('testPassword');
    }, 10000); // 10-second timeout

    // Test case to check if a user can be found by its ID
    test('should find a user by id', async () => {
        // Call the findUserById function to find the user by its ID
        const user = await findUserById(userId);
        
        // Verify that the user is defined
        expect(user).toBeDefined();
        
        // Verify that the username of the user matches the expected value
        expect(user.username).toBe('testUser');
    }, 10000); // 10-second timeout

    // Test case to check if users can be found by their username
    test('should find users by username', async () => {
        // Call the findUserByName function to find users by username
        const users = await findUserByName('testUser');
        
        // Verify that the users are defined
        expect(users).toBeDefined();
        
        // Verify that the result is an array
        expect(Array.isArray(users)).toBe(true);
        
        // Verify that the username of the first user matches the expected username
        expect(users[0].username).toBe('testUser');
    }, 10000); // 10-second timeout
});
