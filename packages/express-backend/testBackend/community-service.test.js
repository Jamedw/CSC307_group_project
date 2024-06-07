// Import necessary modules and services
const { 
    findCommunityById, 
    findCommunityByName, 
    addCommunity, 
    getCommunitiesWLimit, 
    searchCommunityByTerm 
} = require('./community-service');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const communityModel = require('../models/community');

// Load environment variables from the .env file
dotenv.config();

// Before all tests, connect to the MongoDB database
beforeAll(async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// After all tests, close the MongoDB connection
afterAll(async () => {
    await mongoose.connection.close();
});

// Test suite for the Community Service
describe('Community Service', () => {
    // Variable to store the ID of a community added during tests
    let communityId;

    // Test case to check if a community can be added
    test('should add a community', async () => {
        // Define a sample community object
        const community = { name: 'Test Community' };
        
        // Call the addCommunity function to add the community to the database
        const savedCommunity = await addCommunity(community);
        
        // Store the ID of the saved community for use in other tests
        communityId = savedCommunity._id;
        
        // Verify that the saved community is defined
        expect(savedCommunity).toBeDefined();
        
        // Verify that the name of the saved community matches the expected name
        expect(savedCommunity.name).toBe('Test Community');
    });

    // Test case to check if a community can be found by its ID
    test('should find a community by id', async () => {
        // Call the findCommunityById function to find the community by its ID
        const community = await findCommunityById(communityId);
        
        // Verify that the community is defined
        expect(community).toBeDefined();
        
        // Verify that the name of the community matches the expected name
        expect(community.name).toBe('Test Community');
    });

    // Test case to check if communities can be found by their name
    test('should find communities by name', async () => {
        // Call the findCommunityByName function to find communities by name
        const communities = await findCommunityByName('Test Community');
        
        // Verify that the communities are defined
        expect(communities).toBeDefined();
        
        // Verify that the result is an array
        expect(Array.isArray(communities)).toBe(true);
        
        // Verify that the name of the first community matches the expected name
        expect(communities[0].name).toBe('Test Community');
    });

    // Test case to check if communities can be retrieved with a limit
    test('should get communities with limit', async () => {
        // Call the getCommunitiesWLimit function to get communities with a limit
        const communities = await getCommunitiesWLimit(1);
        
        // Verify that the communities are defined
        expect(communities).toBeDefined();
        
        // Verify that the result is an array
        expect(Array.isArray(communities)).toBe(true);
        
        // Verify that the length of the array is less than or equal to the limit
        expect(communities.length).toBeLessThanOrEqual(1);
    });

    // Test case to check if communities can be searched by a term
    test('should search communities by term', async () => {
        // Call the searchCommunityByTerm function to search communities by a term
        const communities = await searchCommunityByTerm('Test', 1);
        
        // Verify that the communities are defined
        expect(communities).toBeDefined();
        
        // Verify that the result is an array
        expect(Array.isArray(communities)).toBe(true);

        // Log the retrieved communities for debugging
        console.log('Retrieved communities:', communities);

        // Normalize the case for comparison
        const communityName = communities[0].name.toLowerCase();
        
        // Verify that the name of the first community contains the search term
        expect(communityName).toContain('test');
    });
});
