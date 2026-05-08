import express from "express";
import { config } from "./config/config.js";
import healthRoutes from "./routes/health.js";
import notificationRoutes from "./routes/notifications.js";
import { initializeDatabase } from "./db/database.js";
import { initializeNotificationSeed } from "./routes/notifications.js";
import { AuthCredentials } from "./utils/auth.js";
import { createErrorLogger, createRequestLogger } from "./middleware/loggingMiddleware.js";

const app = express();
let logAccessToken = config.auth.accessToken;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(createRequestLogger(() => logAccessToken));

app.use("/", healthRoutes);
app.use("/", notificationRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
    path: req.path,
  });
});

app.use(createErrorLogger(() => logAccessToken));

app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

async function startServer() {
  try {
    await initializeDatabase();
    await initializeNotificationSeed();

    try {
      const authResponse = await AuthCredentials();
      if (authResponse?.access_token) {
        logAccessToken = authResponse.access_token;
      }
    } catch (authError) {
      console.warn("Auth token unavailable for logging middleware");
    }

    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${config.environment}`);
      console.log(`Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

export default app;
