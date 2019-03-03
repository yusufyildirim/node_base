const redis = require('../redis');
const { NotFoundError } = require('../utils/errors');

async function isExist(req, res, next) {
  const url = `${req.originalUrl.split('?').shift()}/`;
  const routeList = await redis.getRoutes();
  var routes = routeList.filter((w) => w.path !== '*').filter((w) => {
    const path = `${w.path}/`;
    const routeMatcher = new RegExp(path.replace(/:[^\s/]+/g, '([\\d-]+)'));
    return url.match(routeMatcher) && w.methods.includes(req.method);
  });
  if(routes.length == 0 )  return next(new NotFoundError('request_method_not_found'));
  return next();
}


module.exports = {
  isExist,
};
