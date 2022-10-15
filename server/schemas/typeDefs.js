const { gql } = require('apollo-server-express');

//create the typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        savedBooks(username: String!): [Book]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String, password: String!): Auth
        saveBook(authors: [String!], description: String!, title: String!, bookId: String!, image: String!, link: String!): User
        removeBook(bookId: String!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

//export typeDefs
module.exports = typeDefs;