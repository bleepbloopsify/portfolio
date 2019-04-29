'use strict';

exports.knex = require('knex')({
  client: process.env.DB_TYPE,
  connection: {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_DATABASE || 'db',
  },
  pool: { min: 2, max: 10 },
});

