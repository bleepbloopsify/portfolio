const { ApolloServer, gql } = require('apollo-server-koa');
const _ = require('lodash');

const { authd } = require('./helpers');
const { typeDefs: directiveTypeDefs, directives } = require('./directives');

const { Tools, Rocks } = require('../controllers');

const Account = require('./Account');
const Crafting = require('./Crafting');

const typeDefs = gql`
  type Query {
    hello: String!
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
    hello: () => 'Hello World',
    rocks: authd(async (_, __, ctx) => {
      const { account } = ctx;

      return Rocks.all({ account_id: account.id });
    }),
    tools: authd(async (_, __, ctx) => {
      const { account } = ctx;
      const tools = await Tools.all({ account_id: account.id });

      return tools;
    }),
    store: (_) => {
      return Tools.getStore();
    }
  },
  Mutation: {
    mineRock: authd(async (_, args, ctx) => {
      const { tool_id } = args;
      const { account } = ctx;

      return await Tools.mineRock(account, { id: tool_id });
    }),

    purchaseTool: authd(async (_, args, ctx) => {
      const { account } = ctx;

      return await Tools.purchaseTool(account, args);
    }),

    deleteTool: authd(async (_, args, ctx) => {
      const { account } = ctx;

      return await Tools.deleteTool(account, args);
    }),
  },
};


module.exports = new ApolloServer({ 
  typeDefs: [typeDefs, Account.typeDefs, Crafting.typeDefs, directiveTypeDefs], 
  resolvers: _.merge(resolvers, Account.resolvers, Crafting.resolvers), 
  context: ({ ctx }) => ctx,
  schemaDirectives: directives,
});
