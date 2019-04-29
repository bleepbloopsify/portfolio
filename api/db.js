'use strict';

module.exports = require('knex')({
  client: process.env.DB_TYPE || 'postgres',
  connection: {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_DATABASE || 'dev',
  },
  pool: { min: 2, max: 10 },
});

