const faker = require('faker');

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('accounts').del();
    
  const accounts = Array(20).fill(0).map(i => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };
  });

  await knex('accounts').insert(accounts);
};
