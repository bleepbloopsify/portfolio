const { ApolloServer, gql } = require('apollo-server-koa');

const { Tools, Rocks } = require('../controllers');
const { selectModifier } = require('../models/Modifiers');

const { authd } = require('./helpers');

exports.typeDefs = gql`

extend type Mutation {

  applyCurrency(type: String!, tool_id: Int!): Tool
}

`;

/**
 * Modifier looks like this:
 * {
 *    text: <description of what modifier does>
 *    key:  <key into class array>
 *    likelihood: <describes likelihood of picking this specific modifier>
 *    sequence: <gives it an id>
 *    tiers: []
 * }
 * 
 * Modifier on tool should probably have just text, key, tier, ranges, and final values
 */

exports.resolvers = {
  Mutation: {
    applyCurrency: authd(async(_, args, ctx) => {
      const { account } = ctx;
      const { tool_id, type } = args; 
  
      const modifier = selectModifier();
      console.log(modifier);
      // TODO: now select tier of modifier to apply
  
      const tool = await Tools.get({ id: tool_id });
  
      //TODO: DO SOMETHING HERE
  
      return tool;
    }),
  },
};