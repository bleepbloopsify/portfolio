const { ApolloServer, gql } = require('apollo-server-koa');

const { Accounts } = require('./models');

const typeDefs = gql`
  type Query {
    account(id: ID!): Account
  }

  type Account {
    username: String
    email: String
  }
`;

const resolvers = {
  Query: {
    account: async id => {
      console.log(id);

      return Accounts.getAccount({ id });
    },
  },
};


module.exports = new ApolloServer({ typeDefs, resolvers});
