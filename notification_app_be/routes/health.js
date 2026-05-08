import express from "express";
import { config } from "../config/config.js";

const router = express.Router();

// /health endpoint for health checks
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// /info endpoint for service information
router.get("/info", (req, res) => {
  res.status(200).json({
    service: "Campus Notifications Middleware",
    version: "1.0.0",
    environment: config.environment,
    port: config.port,
  });
});

export default router;
