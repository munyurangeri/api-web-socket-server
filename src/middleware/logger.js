import status from "http-status";
import logger from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  logger.info(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
};

export const errorLogger = (err, req, res, next) => {
  logger.error(err.message);
  res
    .status(status.INTERNAL_SERVER_ERROR)
    .json({ error: "Internal Server Error" });
};
