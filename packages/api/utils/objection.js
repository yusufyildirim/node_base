const { Model, knexSnakeCaseMappers } = require('objection');
const knex = require('knex');
const config = require('../knexfile');

// Initialize knex.
const connection = knex({
  ...config[process.env.NODE_ENV],
  ...knexSnakeCaseMappers(),
});

// Give the knex object to objection.
Model.knex(connection);
