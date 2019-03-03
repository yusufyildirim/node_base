const { promisify } = require('util');
const redis = require('redis');
const { constants } = require('../resources');

const client = redis.createClient(constants.REDIS_URL);

/* Promisified Functions */
client.hmsetAsync = promisify(client.hmset).bind(client);
client.hdelAsync = promisify(client.hdel).bind(client);
client.hgetAllAsync = promisify(client.hgetall).bind(client);
client.hsetAsync = promisify(client.hset).bind(client);
client.hgetAsync = promisify(client.hget).bind(client);
client.hexistsAsync = promisify(client.hexists).bind(client);
client.setAsync = promisify(client.set).bind(client);
client.getAsync = promisify(client.get).bind(client);
client.delAsync = promisify(client.del).bind(client);
client.saddAsync = promisify(client.sadd).bind(client);
client.smembersAsync = promisify(client.smembers).bind(client);
client.mgetAsync = promisify(client.mget).bind(client);
client.keysAsync = promisify(client.keys).bind(client);

async function getJsonAsObject(key) {
  const json = await client.getAsync(key);
  return JSON.parse(json);
}

async function setObjectAsJson(key, value) {
  const json = JSON.stringify(value);
  return client.setAsync(key, json);
}

async function getJsonAsObjectFromHash(key, id) {
  const json = await client.hgetAsync(key, id);
  return JSON.parse(json);
}

async function setObjectAsJsonToHash(key, id, value) {
  return client.hsetAsync(key, id, JSON.stringify(value));
}

module.exports = {
  client,

  getJsonAsObject,
  setObjectAsJson,
  getJsonAsObjectFromHash,
  setObjectAsJsonToHash,
};
