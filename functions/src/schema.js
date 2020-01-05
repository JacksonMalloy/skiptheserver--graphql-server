const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    menus: [Menu]
    menu(id: String!): Menu
    users: [User]
    user(id: String!): User
    items: [Item]
    item(id: String!): Item
    headers: [Header]
    header(id: String!): Header
    options: [Option]
    option(id: String!): Option
  }

  type User {
    name: String!
    id: ID!
    menus: [Menu]!
  }

  type Menu {
    name: String!
    items: [Item]
    id: ID!
    userId: ID!
    user: User!
    headers: [Header]!
  }

  type Item {
    name: String!
    # categories: [Category]
    basePrice: String!
    id: ID!
    description: String
    menu: Menu!
    menuId: ID!
    headerId: ID!
    options: [Options]!
  }

  type Options {
    header: String!
    subHeader: String!
    option: [Option]
    itemId: ID!
    id: ID!
    # Build out "Selections" & "Choose more than one"
  }

  type Option {
    name: String!
    selected: Boolean
  }

  type Header {
    name: String!
    subHeader: String
    id: ID!
    menuId: ID!
    items: [Item]
  }

  # type Category {
  #   name: String!
  #   id: ID!
  # }

  # # Mutations Start Here --
  # interface MutationResponse {
  #   code: String!
  #   success: Boolean!
  #   message: String!
  # }

  # type CreateMenuMutationResponse {
  #   code: String!
  #   success: Boolean!
  #   message: String!
  #   menu: Menu
  # }

  # # Abstract Mutations Above

  # type Mutation {
  #   createMenu(name: String!): Menu!
  #   updateMenu(name: String, id: ID!): Menu
  #   deleteMenu(id: ID!): Menu!
  # }
`;

module.exports = typeDefs;
