const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query {
    menus: [Menu]
    menu(id: ID!): Menu
  }

  type Menu {
    name: String!
    items: [Item]
    id: ID!
  }

  type Item {
    name: String!
    categories: [Category]
    basePrice: Int
    id: ID!
    description: String
  }

  type Category {
    name: String!
    id: ID!
  }

  # Mutations Start Here --
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type CreateMenuMutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menu: Menu
  }
  # Abstract Mutations Above

  type Mutation {
    createMenu(name: String!): Menu
    updateMenu(name: String, id: ID!): Menu
    deleteMenu(id: ID!): Menu
  }
`;

module.exports = typeDefs;
