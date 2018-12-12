const { i18n } = require('../resources');
const {
  ValidationError,
  NotFoundError
} = require('objection');

const {
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = require('objection-db-errors');

module.exports = function errorHandler(err, req, res, next) {
  // TODO: REFACTOR
  // If error thrown by us
  if (err.isJoi) {
    return res.status(400).send({
      message: err.message,
      type: 'ModelValidation',
      data: err.details
    });
  }
  return handler(err, res)
};

function handler(err, res) {
  if (err instanceof ValidationError) {
    res.status(400).send({
      message: err.message,
      type: err.type,
      data: {}
    });
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      message: err.message,
      type: 'NotFound',
      data: {}
    });
  } else if (err instanceof UniqueViolationError) {
    res.status(409).send({
      message: err.message,
      type: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      message: err.message,
      type: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table,
      }
    });
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      message: err.message,
      type: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      message: err.message,
      type: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof DataError) {
    res.status(400).send({
      message: err.message,
      type: 'InvalidData',
      data: {}
    });
  } else if (err instanceof DBError) {
    res.status(500).send({
      message: err.message,
      type: 'UnknownDatabaseError',
      data: {}
    });
  } else {
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
    res.status(500).send({
      message: err.message,
      type: 'UnknownError',
      data: {}
    });
  }
}