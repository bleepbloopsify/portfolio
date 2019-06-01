

exports.seed  = async function(knex, Promise) {

  await Promise.all([
    knex('rocks').del(),
    knex('tools').del(),
  ]);
  
  await knex('accounts').del();
}