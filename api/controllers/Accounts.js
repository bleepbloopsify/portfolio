const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Accounts } = require('../models');

const  SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'keyboard cat';
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || 10 * 1000 * 60 * 60 // 10 hours

exports.createAccount = async ({ username, email, password }) => {
  const account = {
    username,
    email,
    password: await bcrypt.hash(password, SALT_ROUNDS),
  };

  const created  = await Accounts
    .query()
    .returning('*')
    .insert(account);

  console.log(created);

  return created;
}

exports.login = async({ email, password }) => {
  
  const account = await Accounts
    .query()
    .where({ email })
    .returning('*')
    .first();

  if (!account) throw new Error('Invalid email/password');
  if (!account.password) throw new Error('No password set for user. Cannot login.');

  const verify = await bcrypt.compare(password, account.password);
  if (!verify) throw new Error('Invalid email/password');

  const token = await jwt.sign({
    id: account.id,
  }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  return token;
};

exports.verifyToken = async token => jwt.verify(token, JWT_SECRET);

exports.get = async params => {
  return Accounts
    .query()
    .where(params)
    .first()
    .skipUndefined();
};

exports.fetchAll = async params => {
  return Accounts
    .query()
    .skipUndefined()
    .where(params);
};

