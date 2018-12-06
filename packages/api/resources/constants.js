const ENV = process.env.NODE_ENV;
const baseUrl = {
  development: 'http://localhost:8080',
};

export default {
  baseUrl: baseUrl[ENV],
  AUTH_SECRET: 'secret_key',
};
