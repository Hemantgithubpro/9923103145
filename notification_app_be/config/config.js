import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  
  auth_api_url: process.env.AUTH_API_URL || "http://4.224.186.213/evaluation-service/auth",
  log_api_url: process.env.LOG_API_URL || "http://4.224.186.213/evaluation-service/logs",
  
  auth: {
    email: process.env.email || "",
    name: process.env.name || "",
    rollNo: process.env.rollNo || "",
    accessCode: process.env.accessCode || "",
    clientID: process.env.clientID || "",
    clientSecret: process.env.clientSecret || "",
    accessToken: (process.env.ACCESS_TOKEN || "").replace(/[\x00-\x1F\x7F]+/g, "").trim(),
  },
};
