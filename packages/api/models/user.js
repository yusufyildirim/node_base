const BaseModel = require('./baseModel');
const Joi = require('../utils/joi');

class User extends BaseModel {
  static get tableName() { return 'user'; }

  static get virtualAttributes() {
    return ['fullName'];
  }

  fullName() { return this.firstName + this.lastName; }

  static get schema() {
    return {
      email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().required(),
      password: Joi.string().required(),
      firstname: Joi.string(),
      lastname: Joi.string(),
    };
  }
}

module.exports = User;
