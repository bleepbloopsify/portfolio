const { ApolloServer, gql, AuthenticationError } = require('apollo-server-koa');
const _ = require('lodash');

const { Tools, Rocks } = require('../controllers');

const Account = require('./Account');

const typeDefs = gql`
  type Query {
    hello: String
    rocks: [Rock]
    tools: [Tool]
    store: [StoreItem]
  }

  type StoreItem {
    name: String!
    costs: [StorePrice!]!
  }

  type StorePrice {
    name: String!
    cost: Int!
  }

  type Mutation {
    addTool(rocks: [Int]): Tool
    mineRock(tool_id: Int): [Rock]
    purchaseTool(shop_idx: Int): Tool
    deleteTool(tool_id: Int): Tool
  }

  type Rock {
    id: Int!
    account_id: Int!
    name: String!
    count: Int!
  }

  type Modifier {
    text: String!
  }

  type Tool {
    id: Int
    account_id: Int
    name: String!
    power: Int!
    modifiers: [Modifier]!
  }
`;


const resolvers = {
  Query: {
    hello: () => "Hello World",
    rocks: async (_, __, ctx) => {
      const { account } = ctx;
      if (!account) throw new AuthenticationError("No Login");

      return Rocks.all({ account_id: account.id });
    },
    tools: async (_, __, ctx) => {
      const { account } = ctx;
      if (!account) throw new AuthenticationError("No Login");

      const tools = await Tools.all({ account_id: account.id });
      return tools;
    },
    store: (_) => {
      return Tools.getStore();
    }
  },
  Mutation: {
    addTool: async (_, args, ctx) => {
      const { rocks } = args;
      const { account } = ctx;
      if (!account) throw new AuthenticationError("No Login");

      const tool = {
        account_id: account.id,
        name: 'pick',
        power: 1,
      };

      const created = await Tools.insert(tool);

      return created;
    },

    mineRock: async (_, args, ctx) => {
      const { tool_id } = args;
      const { account } = ctx;
      if (!account) throw new AuthenticationError("No Login");

      return await Tools.mineRock(account, { id: tool_id });
    },

    purchaseTool: async (_, args, ctx) => {
      const { account } = ctx;
      if (!account) throw new AuthenticationError("No Login");

      return await Tools.purchaseTool(account, args);
    },

    deleteTool: async (_, args, ctx) => {
      const { account } = ctx;
      if (!account) throw new AuthenticationError("No Login");

      return await Tools.deleteTool(account, args);
    }
  },

  Account: {
    rocks: async account => {
      return await Rocks.all({ account_id: account.id});
    },
    tools: async account => {
      return await Tools.all({ account_id: account.id});
    },
  }
};


module.exports = new ApolloServer({ 
  typeDefs: [typeDefs, Account.typeDef], 
  resolvers: _.merge(resolvers, Account.resolvers), 
  context: ({ ctx }) => ctx,
});
