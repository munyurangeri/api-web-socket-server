export class HttpError extends Error {
  constructor(statusCode = 505, message = "Internal server error", userMessage) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.userMessage = userMessage || "An unexpected error occurred";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends HttpError {
  constructor(resource = "Resource") {
    super(404, `${resource} not found`, `${resource} does not exist.`);
  }
}

export class BadRequestError extends HttpError {
  constructor(
    message = "Invalid request",
    userMessage = "Please check your input and try again."
  ) {
    super(400, message, userMessage);
  }
}
