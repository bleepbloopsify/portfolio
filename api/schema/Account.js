const { gql } = require('apollo-server-koa');

const { authd, admin } = require('./helpers');
const { Accounts, Rocks, Tools } = require('../controllers');

exports.typeDefs = gql`
  type Account {
    id: Int!
    username: String!
    email: String! @private
    rocks: [Rock]
    tools: [Tool]
    is_admin: Boolean @admin
  }

  extend type Query {
    me: Account!
    users: [Account]
    userByUsername(username: String!): Account 
  }

  extend type Mutation {
    login(account: loginInput!): String
    register(account: registerInput!): Account
  }

  input loginInput {
    email: String!
    password: String!
  }

  input registerInput {
    username: String!
    email: String!
    password: String!
  }
`;

exports.resolvers = {
  Query: {
    me: authd(async (_, __, ctx) => {
      const { account } = ctx;

      return Accounts.get(account);
    }),
    users: admin(async () => {
      return Accounts.fetchAll();
    }),
  },
  Mutation: {
    login: async (_, { account }, { cookies }) => {
      return Accounts.login(cookies, account);
    },
    register: async (_, { account }) => {
      console.log(account);
      return Accounts.createAccount(account);
    }
  },

  Account: {
    rocks: async account => {
      return await Rocks.all({ account_id: account.id});
    },
    tools: async account => {
      return await Tools.all({ account_id: account.id});
    },
  },
};