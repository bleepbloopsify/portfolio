const faker = require('faker');
const bcrypt = require('bcryptjs');

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  
  await knex('accounts').insert([{
    username: 'admin',
    email: 'admin',
    password: await bcrypt.hash('password', 10),
    is_admin: true,
  }]);

  const accounts = await Promise.all(Array(20).fill(0).map(async i => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10),
    };
  }));

  await knex('accounts').insert(accounts);
};
