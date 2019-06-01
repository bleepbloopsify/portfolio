
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('rocks', table => {
    table.increments('id').primary();

    table.integer('account_id').unsigned().notNullable();
    
    table.text('name').notNullable().defaultTo('stone');
    table.integer('count').unsigned().defaultTo(1);

    table.foreign('account_id').references('id').inTable('accounts');
  });

  await knex.schema.createTable('tools', table => {
    table.increments('id').primary();

    table.integer('account_id').unsigned().notNullable();

    table.text('name').notNullable().defaultTo('pickaxe'); // this defines base for the item
    table.integer('power').unsigned().notNullable().defaultTo(0); // this defines base power
    table.jsonb('modifiers').notNullable().defaultTo('[]'); // this is a json array of modifiers

    table.foreign('account_id').references('id').inTable('accounts');
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('rocks');
  await knex.schema.dropTableIfExists('tools');
};
