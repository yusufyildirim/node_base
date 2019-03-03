const { client } = require('./connection');
const { constants } = require('../resources');


async function setAccessToken({ userId, tokens }) {
  await client.hmsetAsync(`${constants.accessTokenRK}:${userId}`, tokens);
}
const getAccessToken = (userId, platform) => client.hgetAsync(`${constants.accessTokenRK}:${userId}`, platform);
const getAccessTokens = userId => client.hgetAllAsync(`${constants.accessTokenRK}:${userId}`);
const deleteAccessToken = (userId, platform) => client.hdelAsync(`${constants.accessTokenRK}:${userId}`, platform);

module.exports = {
  setAccessToken,
  getAccessToken,
  getAccessTokens,
  deleteAccessToken,
};
