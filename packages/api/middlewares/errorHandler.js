const { i18n } = require('../resources');

module.exports = function errorHandler(err, req, res, next) {
  // If error thrown by us
  if (err.type) {
    return res.status(err.status).send({
      error: {
        type: err.type,
        code: err.code,
        message: i18n.t(err.code),
      },
    });
  }
  console.log(err);// eslint-disable-line no-console
  return res.status(500).send({ error: { code: 'unknown_error' } });
};
