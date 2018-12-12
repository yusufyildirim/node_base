const BaseJoi = require('joi');
const hash = require('./hash');

// Do not use it for now
const encrypt = {
  name: 'encrypt',
  validate(params, value, state, options) {
    return hash.password(value); // Everything is OK
  }
};

const Joi = BaseJoi.extend((joi) => ({
    base: joi.string(),
    name: 'string',
    rules: [encrypt],
  })
);

module.exports = Joi;