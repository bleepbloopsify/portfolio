const { ApolloServer, gql } = require('apollo-server-koa');

const { Accounts } = require('./models');

const typeDefs = gql`
  type Query {
    account(id: Int): Account
    hello: String
    accounts: [Account]
  }

  type Account {
    username: String
    email: String
  }
`;

const resolvers = {
  Query: {
    account: async (_, args) => {
      return await Accounts.getAccount(args);
    },
    hello: () => "Hello World",
    accounts: () => {
      return Accounts.fetchAll();
    },
  },
};


module.exports = new ApolloServer({ typeDefs, resolvers});
