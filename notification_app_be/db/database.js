import sqlite3 from "sqlite3";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, "..", "notification_app.db");

const db = new sqlite3.Database(DB_PATH);

export function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      audience TEXT NOT NULL DEFAULT 'students',
      status TEXT NOT NULL DEFAULT 'draft',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `;

  return new Promise((resolve, reject) => {
    db.run(createTableQuery, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

export function getDatabase() {
  return db;
}
