const { gql, AuthenticationError } = require('apollo-server-koa');

const { Accounts } = require('../controllers');

exports.typeDef = gql`
  type Account {
    id: Int
    username: String
    email: String
    rocks: [Rock]
    tools: [Tool]
  }

  extend type Query {
    me: Account
  }

  extend type Mutation {
    login(account: loginInput): String
    register(account: registerInput): Account
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
    me: async (_, __, ctx) => {
      const { account } = ctx;
      if (!account) throw new AuthenticationError('No Login');

      return Accounts.get(account);
    },
  },
  Mutation: {
    login: async (_, { account }) => {
      return Accounts.login(account);
    },
    register: async (_, { account }) => {
      return Accounts.createAccount(account);
    }
  }
};