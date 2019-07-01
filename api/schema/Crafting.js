const { ApolloServer, gql } = require('apollo-server-koa');

const { Tools, Rocks } = require('../controllers');
const { selectModifier } = require('../models/Modifiers');

const { authd } = require('./helpers');

exports.typeDefs = gql`

extend type Mutation {

  applyCurrency(type: String!, tool_id: Int!): Tool
}

`;

exports.resolvers = {
  Mutation: {
    applyCurrency: authd(async(_, args, ctx) => {
      const { account } = ctx;
      const { tool_id, type } = args; 
  
      const modifier = selectModifier();
      console.log(modifier);
  
      const tool = await Tools.get({ id: tool_id });
  
      //TODO: DO SOMETHING HERE
  
      return tool;
    }),
  },
};