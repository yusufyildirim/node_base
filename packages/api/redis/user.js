const { client, getJsonAsObject, setObjectAsJson } = require('./connection');
const { constants } = require('../resources');

const getUser = id => getJsonAsObject(`${constants.userRK}:${id}`);
const delUser = id => client.delAsync(`${constants.userRK}:${id}`);

async function addUser({ id, firstname, lastname }) {
  return setObjectAsJson(
    `${constants.userRK}:${id}`,
    { id, firstname, lastname },
  );
}

async function updateUser(id, values) {
  const user = await getUser(id);
  await addUser({ ...user, ...values });
}

module.exports = {
  getUser,
  delUser,
  addUser,
  updateUser,
};
