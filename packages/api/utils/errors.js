class StandartError extends Error {
  constructor(status, type = 'unknown_error', code = 'unknown_error', detail = {}) {
    super(code);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, StandartError);

    this.status = status || 500;
    this.type = type;
    this.code = code;
    this.detail = detail;
  }
}

class BadRequestError extends StandartError {
  constructor(code, detail) {
    super(400, 'logic', code, detail);
  }
}

class NotFoundError extends StandartError {
  constructor(code, detail) {
    super(404, 'not_found', code, detail);
  }
}

class LogicError extends StandartError {
  constructor(code, detail) {
    super(422, 'logic', code, detail);
  }
}

class ValidationError extends StandartError {
  constructor(code, detail) {
    super(422, 'validation', code, detail);
  }
}

class AuthorizationError extends StandartError {
  constructor(code, detail) {
    super(401, 'authorization', code, detail);
  }
}
class ForbiddenError extends StandartError {
  constructor(code, detail) {
    super(403, 'forbidden', code, detail);
  }
}

class ServerError extends StandartError {
  constructor(code, detail) {
    super(500, 'server', code, detail);
  }
}

class TimeoutError extends StandartError {
  constructor(code, detail) {
    super(408, 'timeout', code, detail);
  }
}

module.exports = {
  BadRequestError,
  StandartError,
  LogicError,
  ValidationError,
  AuthorizationError,
  ForbiddenError,
  ServerError,
  NotFoundError,
  TimeoutError,
};
