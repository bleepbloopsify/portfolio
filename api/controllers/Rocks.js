const { Rocks } = require('../models');

exports.get = async params => {
  return Rocks
    .query()
    .where(params)
    .first()
    .skipUndefined();
};

exports.insert = async rock => {
  return Rocks.query()
    .returning('*')
    .insert(rock);
};

exports.all = async params => {
  return Rocks
    .query()
    .where(params);
}