// Import necessary modules and services
const { addComment, findCommentById } = require('./comment-service');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const commentModel = require('../models/comment.js');

// Load environment variables from the .env file
dotenv.config();

// Before all tests, connect to the MongoDB database
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// After all tests, close the MongoDB connection
afterAll(async () => {
    await mongoose.connection.close();
});

// Test suite for the Comment Service
describe('Comment Service', () => {
    // Variable to store the ID of a comment added during tests
    let commentId;

    // Test case to check if a comment can be added
    test('should add a comment', async () => {
        // Define a sample comment object
        const comment = { username: 'testUser', content: 'This is a test comment' };
        
        // Call the addComment function to add the comment to the database
        const savedComment = await addComment(comment);
        
        // Store the ID of the saved comment for use in other tests
        commentId = savedComment._id;
        
        // Verify that the saved comment is defined
        expect(savedComment).toBeDefined();
        
        // Verify that the content of the saved comment matches the expected content
        expect(savedComment.content).toBe('This is a test comment');
    });

    // Test case to check if a comment can be found by its ID
    test('should find a comment by id', async () => {
        // Call the findCommentById function to find the comment by its ID
        const comment = await findCommentById(commentId);
        
        // Verify that the comment is defined
        expect(comment).toBeDefined();
        
        // Verify that the content of the comment matches the expected content
        expect(comment.content).toBe('This is a test comment');
    });
});
