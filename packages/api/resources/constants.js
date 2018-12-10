const ENV = process.env.NODE_ENV;
const baseUrl = {
  development: 'http://localhost:8080',
};

module.exports = {
  baseUrl: baseUrl[ENV],
  AUTH_SECRET: 'secret_key',
};
