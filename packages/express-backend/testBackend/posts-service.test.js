// Import necessary modules and services
const { 
    findPostByTitle, 
    findPostById, 
    addPost, 
    getPostWLimit, 
    searchPostByTerm 
} = require('../services/posts-service');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postsModel = require('../models/posts');

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

// Test suite for the Posts Service
describe('Posts Service', () => {
    // Variable to store the ID of a post added during tests
    let postId;

    // Test case to check if a post can be added
    test('should add a post', async () => {
        // Define a sample post object
        const post = { postTitle: 'Test Post', postContent: 'This is a test post' };
        
        // Call the addPost function to add the post to the database
        const savedPost = await addPost(post);
        
        // Store the ID of the saved post for use in other tests
        postId = savedPost._id;
        
        // Verify that the saved post is defined
        expect(savedPost).toBeDefined();
        
        // Verify that the title and content of the saved post match the expected values
        expect(savedPost.postTitle).toBe('Test Post');
        expect(savedPost.postContent).toBe('This is a test post');
    }, 10000); // 10-second timeout

    // Test case to check if a post can be found by its ID
    test('should find a post by id', async () => {
        // Call the findPostById function to find the post by its ID
        const post = await findPostById(postId);
        
        // Verify that the post is defined
        expect(post).toBeDefined();
        
        // Verify that the title and content of the post match the expected values
        expect(post.postTitle).toBe('Test Post');
        expect(post.postContent).toBe('This is a test post');
    }, 10000); // 10-second timeout

    // Test case to check if posts can be found by their title
    test('should find posts by title', async () => {
        // Call the findPostByTitle function to find posts by title
        const posts = await findPostByTitle('Test Post');
        
        // Verify that the posts are defined
        expect(posts).toBeDefined();
        
        // Verify that the result is an array
        expect(Array.isArray(posts)).toBe(true);
        
        // Verify that the title of the first post matches the expected title
        expect(posts[0].postTitle).toBe('Test Post');
    }, 10000); // 10-second timeout

    // Test case to check if posts can be retrieved with a limit
    test('should get posts with limit', async () => {
        // Call the getPostWLimit function to get posts with a limit
        const posts = await getPostWLimit(1);
        
        // Verify that the posts are defined
        expect(posts).toBeDefined();
        
        // Verify that the result is an array
        expect(Array.isArray(posts)).toBe(true);
        
        // Verify that the length of the array is less than or equal to the limit
        expect(posts.length).toBeLessThanOrEqual(1);
    }, 10000); // 10-second timeout

    // Test case to check if posts can be searched by a term
    test('should search posts by term', async () => {
        // Call the searchPostByTerm function to search posts by a term
        const posts = await searchPostByTerm('Test', 1);
        
        // Verify that the posts are defined
        expect(posts).toBeDefined();
        
        // Verify that the result is an array
        expect(Array.isArray(posts)).toBe(true);

        // Log the retrieved posts for debugging
        console.log('Retrieved posts:', posts);

        // Normalize the case for comparison
        const postTitle = posts[0].postTitle.toLowerCase();
        
        // Verify that the title of the first post contains the search term
        expect(postTitle).toContain('test');
    }, 10000); // 10-second timeout
});
