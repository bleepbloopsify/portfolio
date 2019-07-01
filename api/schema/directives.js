const { SchemaDirectiveVisitor } = require('apollo-server-koa');
const { defaultFieldResolver } = require('graphql');
const { GraphQLBoolean: Boolean } = require('graphql/type');

const { authd } = require('./helpers');


exports.typeDefs = `
directive @admin(defaultBoolean: Boolean = false) on FIELD_DEFINITION

directive @private(
  defaultValue: String = "[redacted]", 
  key: String = "id"
) on FIELD_DEFINITION
`;

class AdminOnlyDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultBoolean } = this.args;


    field.resolve = authd(async function(_, __, context, ___) {
      const { account } = context;

      if (!account.is_admin) {
        if (field.type == Boolean) return defaultBoolean;
        // TODO: add types here as we need them 
      }

      return resolve(_, __, context, ___);
    });
  }
}

class PrivacyDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultValue, key = 'id' } = this.args;

    field.resolve = authd(async function(source, __, context, ___) {
      const { account } = context;
      /**
       * This will pass the actual value if the account id matches 
       */
      if (source[key] === account.id || account.is_admin) {
        return resolve(source, __, context, ___);
      } else {
        return defaultValue;
      }
    });
  }
}

exports.directives = {
  admin: AdminOnlyDirective,
  private: PrivacyDirective,
};