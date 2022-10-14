const { User, Thought, Reaction } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signtToken } = require('../utils/auth');

//create and define the resolvers 
const resolvers = {
    //queries (the 'R' in the CRUD operations)
    Query: {
        helloWorld: () => {
            return 'Hello World';
        }
    },
    //mutations ( the 'C, U, and D of the CRUD operations)
    // Mutation: {

    // }
};

//export the resolvers
module.exports = resolvers;