module.exports = function requestHandler(req, res, next) { // eslint-disable-line no-unused-vars
  if (req.body && typeof req.body === 'object') {
    // email must be lowercase
    if (req.body.email && typeof req.body.email === 'string') {
      req.body.email = req.body.email.toLowerCase();
    }
  }
  next();
};
