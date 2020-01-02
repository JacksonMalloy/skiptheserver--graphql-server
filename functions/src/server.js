// require all dependencies to set up server
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

function configureServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  // now we take our newly instantiated ApolloServer and apply the previously configured express application
  server.applyMiddleware({ app });

  return app;
}
module.exports = configureServer;
