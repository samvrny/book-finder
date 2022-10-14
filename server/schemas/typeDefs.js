const { gql } = require('apollo-server-express');

//create the typeDefs
const typeDefs = gql`
    type Query {
        helloWorld: String
    }
`;

//export typeDefs
module.exports = typeDefs;