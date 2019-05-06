const { ApolloServer, gql } = require('apollo-server-koa');

const { Tools } = require('../models');
const { Accounts, Rocks } = require('../controllers');

const typeDefs = gql`
  type Query {
    me: Account
    account(id: Int): Account
    hello: String
    accounts: [Account]
    rocks: [Rock]
  }

  type Mutation {
    login(account: loginInput): String
    register(account: registerInput): Account

    addTool(rocks: [Int]): Tool
    mineRock(tool_id: Int): Rock
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

  type Account {
    id: Int
    username: String
    email: String
    rocks: [Rock]
    tools: [Tool]
  }

  type Rock {
    id: Int
    account_id: Int
    name: String!
    value: Int!
  }

  type Tool {
    id: Int
    account_id: Int
    name: String!
    power: Int!
  }
`;


const resolvers = {
  Query: {
    me: async (_, __, ctx) => {
      const { account } = ctx;

      return Accounts.get(account);
    },
    account: async (_, args) => {
      return await Accounts.get(args);
    },
    hello: () => "Hello World",
    accounts: () => {
      return Accounts.fetchAll();
    },
    rocks: async (_, __, ctx) => {
      const { account } = ctx;

      return Rocks.all({ account_id: account.id });
    }
  },
  Mutation: {
    login: async (_, args, ctx) => {
      const { account } = args;

      return Accounts.login(account);
    },
    register: async (_, args, ctx) => {
      const { account } = args;

      return Accounts.createAccount(account);
    },

    addTool: async (_, args, ctx) => {
      const { rocks } = args;
      const { account } = ctx;

      const tool = {
        account_id: account.id,
        name: 'pick',
        power: 1,
      };

      const [created] = await Tools.insertTool(tool);

      return created;
    },

    mineRock: async (_, args, ctx, info) => {
      const { tool_id } = args;
      const { account = null } = ctx;

      // TODO: fetch power from tool
      console.log("[mineRock] Creating rock for account ", account);

      const rock = {
        account_id: account.id,
        name: 'stone',
        value: 1,
      };

      const created = await Rocks.insert(rock);
      return created;
    }
  },

  Account: {
    rocks: async account => {
      return await Rocks.all(account);
    },
    tools: async account => {
      return await Tools.getTools(account);
    },
  }
};


module.exports = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ ctx }) => ctx,
});
