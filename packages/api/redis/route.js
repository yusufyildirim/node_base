const { getJsonAsObject, setObjectAsJson } = require('./connection');
const { constants } = require('../resources');

// wrrite all routes to redis
async function setRoutes(routes) { await setObjectAsJson(`${constants.routesRK}`, routes); }
const getRoutes = () => getJsonAsObject(`${constants.routesRK}`);


module.exports = {
  setRoutes,
  getRoutes,
};
