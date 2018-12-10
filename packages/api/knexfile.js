

module.exports = {
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
