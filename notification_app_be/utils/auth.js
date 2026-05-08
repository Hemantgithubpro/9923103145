import axios from "axios";
import { config } from "../config/config.js";

export async function AuthCredentials() {
  try {
    const payload = {
      email: config.auth.email,
      name: config.auth.name,
      rollNo: config.auth.rollNo,
      accessCode: config.auth.accessCode,
      clientID: config.auth.clientID,
      clientSecret: config.auth.clientSecret,
    };

    const response = await axios.post(config.auth_api_url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("[INFO] Authentication successful");
    return response.data;
  } catch (error) {
    console.error("[ERROR] Authentication failed:", error.message);
    throw error;
  }
}
