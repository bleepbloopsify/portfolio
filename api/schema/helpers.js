const { AuthenticationError, ForbiddenError } = require('apollo-server-koa');

const AuthorizationError = ForbiddenError;

exports.authd = next => (_, __, ctx, ___) => {
  const { account } = ctx;

  if (!account) throw new AuthenticationError('No Login');

  return next(_, __, ctx, ___);
};

exports.admin = next => (_, __, ctx, ___) => {
  const { account } = ctx;

  if (!account) throw new AuthenticationError('No Login');

  if (!account.is_admin) throw new AuthorizationError('Not authorized to access this resource');

  return next(_, __, ctx, ___);
};

