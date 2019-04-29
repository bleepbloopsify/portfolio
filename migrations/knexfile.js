const knex = require('knex');

const configuration = {
  client: 'postgresql',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

const connection = {
  host: 'db',
  user: 'root',
  password: 'root',
};

module.exports = {
  development: Object.assign({}, 
    configuration, 
    { 
      connection: Object.assign({}, 
        connection, 
      { database: 'dev' }
      ),
    },
  ),
  staging: Object.assign({}, 
    configuration, 
    { 
      connection: Object.assign({}, 
        connection, 
      { database: 'staging' }
      ),
    },
  ),
  production: Object.assign({}, 
    configuration, 
    { 
      connection: Object.assign({}, 
        connection, 
      { database: 'db' }
      ),
    },
  ),
};
