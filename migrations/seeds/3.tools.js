const faker = require('faker');
const _ = require('lodash');


exports.seed = async function(knex, Promise) {

  const accounts = await knex('accounts').select('id');

  const tools = accounts.map(({ id: account_id }) => ({
    name: faker.lorem.words(2),
    account_id,
    power: _.random(0, 2000),
    modifiers: JSON.stringify([
      {
        text: 'Sample modifier',
      }
    ]),
  }));

  await knex('tools').insert(tools);
};