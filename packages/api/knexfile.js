module.exports = {
  local: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'postgres',
      user: 'postgres',
      password: '',
      port: '5433',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    // debug: true,
  },
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      database: 'postgres',
      user: 'postgres',
      password: '',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    debug: true,
  },
};
