const jwt = require('jsonwebtoken');
const { constants } = require('../resources');
const { AuthorizationError } = require('../utils/errors');
const errorHandler = require('./errorHandler');

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return next(new AuthorizationError('token_not_provided'));

  const [bearer, token] = authorization.split(' ');

  if (bearer === 'Bearer' && token) {
    return jwt.verify(token, constants.AUTH_SECRET, (err, decoded) => {
      if (err) return next(new AuthorizationError('token_not_valid'));

      req.userId = decoded.userId;

      return next();
    });
  }
  return next(new AuthorizationError('token_should_bearer'));
}

function generateToken(userId) {
  return jwt.sign({ userId }, constants.AUTH_SECRET);
}

module.exports = {
  isAuthenticated,
  generateToken,
};
