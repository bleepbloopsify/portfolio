'use strict';

const knex = require('../db');

const { Model: ObjectionModel } = require('objection');

class Model extends ObjectionModel {


}

Model.knex(knex);

module.exports = Model;
