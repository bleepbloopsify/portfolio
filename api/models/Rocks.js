'use strict';

const Model = require('./Model');

class Rocks extends Model {
  static get tableName() {
    return 'rocks';
  }
}

module.exports = Rocks;