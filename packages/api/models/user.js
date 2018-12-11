const BaseModel = require('./baseModel');

class User extends BaseModel {
  static get tableName() { return 'user'; }

  static get virtualAttributes() {
    return ['fullName'];
  }

  fullName() { return this.firstName + this.lastName; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      email : { type: 'string' },
      password : { type: 'string' },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
    };
  }
}

module.exports = User;
