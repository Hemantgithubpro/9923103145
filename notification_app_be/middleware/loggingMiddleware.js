import { Log, LogWithAuth } from "../utils/logger.js";

function buildRequestMessage(req) {
  return `${req.method} ${req.originalUrl}`;
}

export function createRequestLogger(getToken) {
  return (req, res, next) => {
    const startTime = Date.now();

    res.on("finish", () => {
      const durationMs = Date.now() - startTime;
      const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
      const message = `${buildRequestMessage(req)} -> ${res.statusCode} (${durationMs}ms)`;
      const token = typeof getToken === "function" ? getToken() : "";

      void (token ? LogWithAuth("backend", level, "route", message, token) : Log("backend", level, "route", message));
    });

    next();
  };
}

export function createErrorLogger(getToken) {
  return (err, req, res, next) => {
    const token = typeof getToken === "function" ? getToken() : "";
    const message = `${req.method} ${req.originalUrl} -> ${err.message}`;

    void (token ? LogWithAuth("backend", "error", "handler", message, token) : Log("backend", "error", "handler", message));
    next(err);
  };
}