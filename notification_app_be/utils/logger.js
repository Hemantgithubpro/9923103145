import axios from "axios";

const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

// stack - 'backend'
// level - 'debug', 'info', 'warn', 'error', 'fatal'
// pkg - 'cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'
// message
 
export async function Log(stack, level, pkg, message) {
  try {
    const payload = { stack, level, package: pkg, message };

    const response = await axios.post(LOG_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(`[${level.toUpperCase()}] ${pkg}: ${message}`);
    return response.data;
  } catch (error) {
    console.error("Failed to send log:", error.message);
  }
}


// stack - 'backend'
// level - 'debug', 'info', 'warn', 'error', 'fatal'
// pkg - 'cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'
// message
// token 

export async function LogWithAuth(stack, level, pkg, message, token) {
  try {
    const payload = { stack, level, package: pkg, message };

    // Clean token: remove all control characters and whitespace
    const cleanToken = (token || "").replace(/[\x00-\x1F\x7F]+/g, "").trim();

    const response = await axios.post(LOG_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cleanToken}`,
      },
    });

    console.log(`[${level.toUpperCase()}] ${pkg}: ${message}`);
    return response.data;
  } catch (error) {
    console.error("Failed to send log:", error.message);
  }
}
