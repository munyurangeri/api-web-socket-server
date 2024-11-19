import status from "http-status";
import logger from "../utils/logger.js";
import { toSnakeCase } from "../utils/convert-case.js";

export const requestLogger = (req, res, next) => {
  logger.info(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
};

export const errorLogger = (err, req, res, next) => {
  logger.error(err.message);

  if (err.message.startsWith("Validation"))
    res
      .status(status.BAD_REQUEST)
      .json({ status: "bad request", message: toSnakeCase(err.message) });
  else
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ status: "Internal Server Error", error: err.message });
};
