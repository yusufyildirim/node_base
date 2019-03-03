const jwt = require('jsonwebtoken');
const redis = require('../redis');
const { AuthorizationError, ForbiddenError } = require('../utils/errors');
const { constants } = require('../resources');
// const errorHandler = require('./errorHandler');

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return next(new AuthorizationError('token_not_provided'));

  const [bearer, token] = authorization.split(' ');

  if (bearer === 'Bearer' && token) {
    return jwt.verify(token, constants.AUTH_SECRET, (err, decoded) => {
      if (err) return next(new AuthorizationError('token_not_valid'));

      req.userId = decoded.userId;
      if (decoded.roles) req.roles = decoded.roles;

      // if mobile device and web can access same time send Platform in header
      const platform = req.get('Platform');
      return redis.getAccessToken(decoded.userId, (platform || 'web'))
        .then((redisToken) => {
          if (token === redisToken) return next();
          return next(new AuthorizationError('token_not_valid'));
        })
        .catch(() => next(new AuthorizationError('token_not_valid')));
    });
  }
  return next(new AuthorizationError('token_should_bearer'));
}

async function isAuthorized(req, res, next) {
  if (!req.roles) return next(new ForbiddenError('user_not_authenticated'));
  const url = req.url.split('?').shift();
  const routeName = url.replace(/\/\d+$/gi, '').replace(/\/([a-z])/gi, '$1');
  const roles = await redis.getRoles(req.roles);
  // console.log(req.originalUrl, req.url, url,  routeName, roles);
  if (roles.map(c => c.toLowerCase()).indexOf(`${routeName.toLowerCase()}:${constants.PERMISSION[req.method]}`) === -1) {
    return next(new ForbiddenError('user_not_authenticated'));
  }
  return next();
}

function generateToken(userId, roles) {
  return jwt.sign({ userId, roles }, constants.AUTH_SECRET);
}

module.exports = {
  isAuthenticated,
  isAuthorized,
  generateToken,
};
