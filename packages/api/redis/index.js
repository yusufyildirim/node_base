const token = require('./token');
const route = require('./route');
const user = require('./user');

const { client } = require('./connection');

async function getJsonAsObject(key) {
  const json = await client.getAsync(key);
  return JSON.parse(json);
}

async function setObjectAsJson(key, value) {
  return client.setAsync(key, JSON.stringify(value));
}

module.exports = {
  getJsonAsObject,
  setObjectAsJson,

  ...token,
  ...route,
  ...user,
};
