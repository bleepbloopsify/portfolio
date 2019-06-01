'use strict';

const Model = require('./Model');

class Tools extends Model {
  static get tableName() {
    return 'tools';
  }
}

module.exports = Tools;