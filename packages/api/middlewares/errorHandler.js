const { ValidationError: ObjectionValidationError } = require('../utils/objection');
const { UniqueViolationError, NotNullViolationError, ForeignKeyViolationError, DataError } = require('objection-db-errors');
const { i18n } = require('../resources');
const {
  LogicError,
  BadRequestError,
  ValidationError,
  ServerError,
  AuthorizationError,
  ForbiddenError,
  NotFoundError,
  TimeoutError } = require('../utils/errors');

function generateResponse(e) {
  switch (e.constructor) {
    case ObjectionValidationError:
      return new ValidationError('orm_validation', { ...e });

    case UniqueViolationError:
      return new LogicError('unique_violation', { message: e.detail, field: e.columns[0], constraint: e.constraint });

    case NotNullViolationError:
      return new ValidationError('field_null', { message: `${e.column} can't be null.`, field: e.column, constraint: e.constraint }); // TODO: i18n message

    case ForeignKeyViolationError:
      return new LogicError('foreign_key_violation', { message: e.detail, constraint: e.constraint });

    case DataError:
      return new BadRequestError('invalid_data', e);

    case SyntaxError:
      return new BadRequestError('json_syntax');

    case NotFoundError:
    case BadRequestError:
    case LogicError:
    case ValidationError:
    case AuthorizationError:
    case ForbiddenError:
    case ServerError:
      return e;

    case Error:
      if (e.isJoi) return new ValidationError('field_validation', { message: e.details[0].message, field: e.details[0].path });
      return new ServerError('error', { message: e.message });

    default:
      if (e.code === 'ETIMEDOUT') return new TimeoutError('timeout_error', { ...e });
      return new ServerError('unhandled_error', { errorClass: e.constructor.name, ...e });
  }
}


function errorHandler(err, req, res, next) {
  const { status, ...response } = generateResponse(err);
  return res
    .status(status)
    .json(response);
}

module.exports = errorHandler;
