//requiring express and path, and importing the database connection
const express = require('express');
const path = require('path');
const db = require('./config/connection');

//import typeDefs, resolvers, Auth middleware and apollo to the server
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('apollo-server-express');

//WARN: These routes are the originals and will need to be removed later.
//const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//create a new apollo server and pass in the schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//WARN these are the original routes and will need to be eliminated before deployment
//app.use(routes);

//start the apollo server
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //the next line integrates the apollo server with the express application as middleware
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API Server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
}

//call to start the apollo server
startApolloServer(typeDefs, resolvers);