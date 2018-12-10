import BaseModel from './baseModel';

export default class User extends BaseModel {
  static tableName = 'user';

  // static getBy = (column, value) => User.query().where(column, value).first();

  fullName = () => this.firstName + this.lastName;

  static jsonSchema = {
    type: 'object',
    id: { type: 'integer' },
    firstName: { type: 'string', minLength: 1, maxLength: 255 },
    lastName: { type: 'string', minLength: 1, maxLength: 255 },
  };
}
