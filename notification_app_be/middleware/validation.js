import { badRequest } from "../utils/httpError.js";

const allowedAudiences = new Set(["students", "faculty", "admins", "all"]);
const allowedStatuses = new Set(["draft", "published", "archived"]);

function requireStringField(value, fieldName) {
  if (typeof value !== "string" || !value.trim()) {
    throw badRequest(`${fieldName} is required and must be a non-empty string`);
  }

  return value.trim();
}

export function validateNotificationBody(options = {}) {
  const { requireTitle = true, requireMessage = true } = options;

  return (req, res, next) => {
    try {
      const { title, message, audience, status } = req.body;

      if (requireTitle) {
        req.body.title = requireStringField(title, "title");
      } else if (typeof title === "string") {
        req.body.title = requireStringField(title, "title");
      }

      if (requireMessage) {
        req.body.message = requireStringField(message, "message");
      } else if (typeof message === "string") {
        req.body.message = requireStringField(message, "message");
      }

      if (typeof audience === "string") {
        req.body.audience = audience.trim().toLowerCase();
      }

      if (typeof status === "string") {
        req.body.status = status.trim().toLowerCase();
      }

      if (req.body.audience && !allowedAudiences.has(req.body.audience)) {
        throw badRequest(`audience must be one of: ${Array.from(allowedAudiences).join(", ")}`);
      }

      if (req.body.status && !allowedStatuses.has(req.body.status)) {
        throw badRequest(`status must be one of: ${Array.from(allowedStatuses).join(", ")}`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}