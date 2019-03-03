const redis = require('./index');
const { User } = require('../models');

async function seedUser() {
  const users = await User.query();
  users.forEach(user => redis.addUser(user));
}

async function seedAll() {
  seedUser();
}

module.exports = {
  seedAll,
  seedUser,
};
