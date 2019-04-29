
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('accounts', table => {
    table.increments('id').primary();

    table.string('username', 255);
    table.string('email', 255);

    table.string('password', 255);
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('accounts');
};
