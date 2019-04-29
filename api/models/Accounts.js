'use strict';

const knex = require('../db');


exports.getAccount = function(account) {

  return knex('accounts')
    .select('*')
    .where(account)
    .first();
}
