export class AppError extends Error {
  constructor(
    statusCode = 505,
    message = "Internal server error",
    userMessage
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.userMessage = userMessage || "An unexpected error occurred";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(404, `${resource} not found`, `${resource} does not exist.`);
  }
}

export class BadRequestError extends AppError {
  constructor(
    message = "Invalid request",
    userMessage = "Please check your input and try again."
  ) {
    super(400, message, userMessage);
  }
}

export class NotImplementedError extends AppError {
  constructor(
    message = "function is not implemented",
    userMessage = "Functionality is not available yet."
  ) {
    super(500, message, userMessage);
  }
}
