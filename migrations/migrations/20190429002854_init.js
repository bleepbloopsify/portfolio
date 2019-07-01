
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('accounts', table => {
    table.increments('id').primary();

    table.string('username', 255).unique().notNullable();
    table.string('email', 255).unique().notNullable();

    table.string('password', 255).notNullable();

    table.boolean('is_admin').notNullable().default(false);
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('accounts');
};
