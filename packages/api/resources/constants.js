const ENV = process.env.NODE_ENV;
const baseUrl = {
  development: 'http://localhost:8080',
};

const REDIS_URL = {
  local: 'redis://127.0.0.1:6380',
  development: 'redis://redis:6379',
}[ENV];

module.exports = {
  REDIS_URL,
  baseUrl: baseUrl[ENV],
  AUTH_SECRET: 'secret_key',

  routesRK: 'routes', // RK means Redis Key
  userRK: 'user',
  roleRK: 'role',
  accessTokenRK: 'accessToken',
};
