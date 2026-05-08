import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";
const AUTH_API_URL = "http://4.224.186.213/evaluation-service/auth";


async function AuthCredentials(email,name,rollNo,accessCode,clientID,clientSecret) {
  try {
    const payload = { email, name, rollNo, accessCode, clientID, clientSecret };

    const response = await axios.post(AUTH_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to authenticate:", error);
  }
}

 async function Log(stack, level, pkg, message) {
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

// stack: backend
// level: debug, info, warn, error, fatal
// package: cache, controller, cron_job, db, domain, handler, repository, route, service
// message: any string



// this api call has to take authorization token as well
 async function LogWithAuth(stack, level, pkg, message, token) {
  try {
    const payload = { stack, level, package: pkg, message };

    const cleanToken = (token || "").replace(/[\x00-\x1F\x7F]+/g, "").trim();

    const response = await axios.post(LOG_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cleanToken}`
      },
    });

    console.log(`Log sent: ${level.toUpperCase()} - ${message}`);
    return response.data;
  } catch (error) {
    console.error("Failed to send log:", error);
  }
}

const token = (process.env.ACCESS_TOKEN || "").replace(/\r?\n/g, "").trim();
const email = process.env.email || "";
const name = process.env.name || "";
const rollNo = process.env.rollNo || "";
const accessCode = process.env.accessCode || "";
const clientID = process.env.clientID || "";
const clientSecret = process.env.clientSecret || "";

async function run() {
  const authResponse = await AuthCredentials(email, name, rollNo, accessCode, clientID, clientSecret);
  // console.log("Auth Response:", authResponse);
  const accessToken = authResponse.access_token;
  // console.log("Using Access Token:", accessToken);

  let logResponse = await LogWithAuth("backend", "error", "handler", "received string, expected bool", accessToken);
  console.log("Log Response:", logResponse);
}

run();
