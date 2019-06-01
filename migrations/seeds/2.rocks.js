const _ = require('lodash');

exports.seed = async function (knex, Promise) {

  const accounts = await knex('accounts').select('id');

  const rocks = ['stone', 'obsidian', 'emerald', 'diamond'].reduce((rocks, name) => {
    return [...rocks, ...accounts.map(({ id :account_id }) => {
      return {
        account_id,
        name,
        count: _.random(1, 2000),
      };
    })];
  }, []);

  await knex('rocks').insert(rocks);
}