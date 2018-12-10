class StandartError extends Error {
  constructor(status, type, code) {
    super(code);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, StandartError);

    this.status = status || 500;
    this.type = type || 'standart_error';
    this.code = code || 'standart_error';
  }
}

class LogicError extends StandartError {
  constructor(code) {
    super(400, 'logic', code);
  }
}

class ValidationError extends StandartError {
  constructor(code) {
    super(422, 'validation', code);
  }
}

class AuthorizationError extends StandartError {
  constructor(code) {
    super(401, 'authorization', code);
  }
}
class ForbiddenError extends StandartError {
  constructor(code) {
    super(403, 'forbidden', code);
  }
}

module.exports = {
  StandartError,
  LogicError,
  ValidationError,
  AuthorizationError,
  ForbiddenError,
};
