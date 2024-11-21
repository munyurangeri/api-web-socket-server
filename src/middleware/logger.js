/* eslint-disable no-unused-vars */
import logger from "../utils/logger.js";

export const requestLogger = (req, _res, next) => {
  logger.info(`${new Date().toUTCString()}: ${req.method} ${req.url}`);
  next();
};

export const errorLogger = (err, _req, res, _next) => {
  logger.error(
    `[${new Date().toUTCString()}] ${err.statusCode} ${err.message} - stack ${
      err.stack
    }`
  );

  res.status(err.statusCode).json({ message: err.userMessage });
};
