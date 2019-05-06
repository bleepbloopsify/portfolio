'use strict';

const knex = require('../db');

exports.insertTool = function(tool) {
  return knex('tools')
    .insert(tool)
    .returning('*');
};

exports.getTools = function(account) {
  const { id: account_id } = account;
  return knex('tools')
    .where({ account_id });
};

