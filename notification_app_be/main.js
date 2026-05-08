import axios from "axios";

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
