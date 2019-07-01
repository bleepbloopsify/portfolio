'use strict';

const Model = require('./Model');

class Tools extends Model {
  static get tableName() {
    return 'tools';
  }

  /**
   * This will apply a specific currency to this.
   * Will probably be a key into a dictionary of singleetons that handles each
   * individual currency type. 
   * @param { id, name, count } currency - the type of currency to apply
   */
  applyCurrency(currency) {

  }
}

module.exports = Tools;