const { ApolloError, ValidationError } = require("apollo-server");
const admin = require("firebase-admin");

const serviceAccount = require("../../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const resolvers = {
  // User Object Resolver
  User: {
    async menus(user) {
      try {
        const userMenus = await admin
          .firestore()
          .collection("menus")
          .where("userId", "==", user.id)
          .get();
        return userMenus.docs.map(menu => menu.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },

  // Menu Object Resolver
  Menu: {
    // Menu.user
    async user(menu) {
      try {
        userMenus = await admin
          .firestore()
          .doc(`users/${menu.userId}`)
          .get();
        return userMenus.data();
      } catch (error) {
        throw new ApolloError(error);
      }
    },

    // Menu.items
    async items(menu) {
      try {
        menuItems = await admin
          .firestore()
          .collection("items")
          .where("menuId", "==", menu.id)
          .get();
        return menuItems.docs.map(item => item.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    },

    // Menu.headers
    async headers(menu) {
      try {
        allHeaders = await admin
          .firestore()
          .collection("headers")
          .where("menuId", "==", menu.id)
          .get();
        return allHeaders.docs.map(header => header.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },

  // Header Resolver Object
  Header: {
    // Header.items
    async items(header) {
      try {
        const menuHeaders = await admin
          .firestore()
          .collection("items")
          .where("headerId", "==", header.id)
          .get();
        return menuHeaders.docs.map(header => header.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },

  Item: {
    async options(item) {
      try {
        const itemOptions = await admin
          .firestore()
          .collection("options")
          .where("itemId", "==", item.id)
          .get();
        return itemOptions.docs.map(option => option.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },

  Options: {
    async option(item) {
      try {
        const singleOption = await admin
          .firestore()
          .collection("options")
          .where("itemId", "==", item.id)
          .collection("option")
          .get();
        return singleOption.docs.map(opt => opt.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },

  Query: {
    // Get All Options
    async options() {
      const options = await admin
        .firestore()
        .collection("options")
        .get();
      return options.docs.map(option => option.data());
    },

    // Get Option
    async option(_, args) {
      try {
        const optionDoc = await admin
          .firestore()
          .doc(`options/${args.id}`)
          .get();
        const option = optionDoc.data();
        return option || new ValidationError("Option ID not found");
      } catch (error) {
        throw new ApolloError(error);
      }
    },

    // Get All Headers
    async headers() {
      const headers = await admin
        .firestore()
        .collection("headers")
        .get();
      return headers.docs.map(header => header.data());
    },

    // Get Header
    async header(_, args) {
      try {
        const headerDoc = await admin
          .firestore()
          .doc(`headers/${args.id}`)
          .get();
        const header = headerDoc.data();
        return header || new ValidationError("Header ID not found");
      } catch (error) {
        throw new ApolloError(error);
      }
    },

    // Get All Items
    async items() {
      const items = await admin
        .firestore()
        .collection("items")
        .get();
      return items.docs.map(item => item.data());
    },

    // Get Menu
    async menu(_, args) {
      try {
        const menuDoc = await admin
          .firestore()
          .doc(`menus/${args.id}`)
          .get();
        const menu = menuDoc.data();
        return menu || new ValidationError("Menu ID not found");
      } catch (error) {
        throw new ApolloError(error);
      }
    },

    // Get all Menus
    async menus() {
      const menus = await admin
        .firestore()
        .collection("menus")
        .get();
      return menus.docs.map(menu => menu.data());
    },

    // Get User
    async user(_, args) {
      try {
        const userDoc = await admin
          .firestore()
          .doc(`users/${args.id}`)
          .get();
        const user = userDoc.data();
        return user || new ValidationError("User ID not found");
      } catch (error) {
        throw new ApolloError(error);
      }
    },

    // Get All Users
    async users() {
      const users = await admin
        .firestore()
        .collection("users")
        .get();
      return users.docs.map(user => user.data());
    }
  }
};

module.exports = resolvers;
