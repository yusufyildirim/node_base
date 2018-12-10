import { Model, knexSnakeCaseMappers } from 'objection';
import knex from 'knex';
import config from '../knexfile';

// Initialize knex.
const connection = knex({
  ...config[process.env.NODE_ENV],
  ...knexSnakeCaseMappers(),
});

// Give the knex object to objection.
Model.knex(connection);
