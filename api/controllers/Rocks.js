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

exports.deposit = async (rocks) => {
  return Promise.all(rocks.map(async ({ account_id, name, count }) => {
    return Rocks
      .query()
      .where({ account_id, name })
      .increment('count', count)
      .returning('*')
      .first()
      .skipUndefined();
  }));
}