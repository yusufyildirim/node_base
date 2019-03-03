
const { Model, Validator } = require('objection');
const { DbErrors } = require('objection-db-errors');
const visibilityPlugin = require('objection-visibility').default;
const { NotFoundError } = require('../utils/errors');
const Joi = require('../utils/joi');

class QB extends Model.QueryBuilder {
  throwIfNotFound(code = 'data_not_exists') {
    return this.runAfter((result) => {
      if ((Array.isArray(result) && result.length === 0) || result === null || result === undefined || result === 0) {
        throw new NotFoundError(code);
      } else {
        return result;
      }
    });
  }

  addToContext(obj) {
    this.mergeContext(obj);
    return this;
  }
}

class MyCustomValidator extends Validator {
  validate({ model, json, options }) { // eslint-disable-line class-methods-use-this
    const modelClass = model.constructor;
    let { schema } = modelClass;

    if (options.patch) {
      schema = Joi.object().keys(schema).optionalKeys(Object.keys(schema));
    }
    const { error, value } = Joi.validate(json, schema);
    if (error) throw error;

    // You need to return the (possibly modified) json.
    return value;
  }
}

class BaseModel extends visibilityPlugin(DbErrors(Model)) {
  static get modelPaths() {
    return [__dirname];
  }

  static get primaryKey() {
    return {
      id: Joi.number().required(),
    };
  }

  static get filters() {
    return {
      search: Joi.string(),
      page: Joi.number().min(0).default(0),
      pageSize: Joi.number().min(1).default(20000),
      column: Joi.string().default('id'),
      order: Joi.string().default('asc'),
    };
  }

  static get QueryBuilder() {
    return QB;
  }

  static createValidator() {
    return new MyCustomValidator();
  }

  static get hidden() {
    return ['password', 'deleted'];
  }
}

module.exports = BaseModel;
