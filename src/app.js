import express from "express";
import helmet from "helmet";
import cors from "cors";
import status from "http-status";
import userRoutes from "./routes/user-routes.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";
import { apiLimiter } from "./middleware/rate-limiter.js";

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());

// Rate Limiter
app.use(apiLimiter);

// Logging Middleware
app.use(requestLogger);

// Body Parsing
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Error Logging Middleware
app.use(errorLogger);

// Handle 404 Errors
app.use((req, res) => {
  res.status(status.NOT_FOUND).json({ error: "Route not found" });
});

// TODO: Handle uncaugth errors

export default app;
