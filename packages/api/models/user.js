const BaseModel = require('./baseModel');

class User extends BaseModel {
  static tableName() { return 'user'; }

  // static getBy = (column, value) => User.query().where(column, value).first();

  fullName() { return this.firstName + this.lastName; }

  static jsonSchema() {
    return {
      type: 'object',
      id: { type: 'integer' },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
    };
  }
}

module.exports = User;
