import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";


export async function Log(stack, level, pkg, message) {
  try {
    const payload = { stack, level, package: pkg, message };

    const response = await axios.post(LOG_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(`Log sent: ${level.toUpperCase()} - ${message}`);
    return response.data;
  } catch (error) {
    console.error("Failed to send log:", error);
  }
}

// this api call has to take authorization token as well
export async function LogWithAuth(stack, level, pkg, message, token) {
  try {
    const payload = { stack, level, package: pkg, message };

    const response = await axios.post(LOG_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    console.log(`Log sent: ${level.toUpperCase()} - ${message}`);
    return response.data;
  } catch (error) {
    console.error("Failed to send log:", error);
  }
}

const token = process.env.ACCESS_TOKEN;

async function run() {
  if (!token) {
    console.error("ACCESS_TOKEN not set in .env");
    return;
  }

  try {
    const value = await LogWithAuth("backend", "error", "handler", "This is a log message with authentication", token);
    console.log(value);
  } catch (err) {
    console.error("Error sending authenticated log:", err);
  }
}

run();
