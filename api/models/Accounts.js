'use strict';

const Model  = require('./Model');

class Accounts extends Model {
    static get tableName() {
      return 'accounts';
    }

}

module.exports = Accounts;