import { getDatabase } from "../db/database.js";

const db = getDatabase();

function run(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });
}

function all(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

export async function seedNotifications(notifications) {
  for (const notification of notifications) {
    await run(
      `INSERT OR IGNORE INTO notifications (id, title, message, audience, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        notification.id,
        notification.title,
        notification.message,
        notification.audience,
        notification.status,
        notification.createdAt,
        notification.updatedAt,
      ]
    );
  }
}

export async function getAllNotifications() {
  return all("SELECT * FROM notifications ORDER BY createdAt DESC");
}

export async function getNotificationById(id) {
  return get("SELECT * FROM notifications WHERE id = ?", [id]);
}

export async function createNotification(notification) {
  await run(
    `INSERT INTO notifications (id, title, message, audience, status, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      notification.id,
      notification.title,
      notification.message,
      notification.audience,
      notification.status,
      notification.createdAt,
      notification.updatedAt,
    ]
  );

  return getNotificationById(notification.id);
}

export async function updateNotification(id, updates) {
  const existingNotification = await getNotificationById(id);

  if (!existingNotification) {
    return null;
  }

  const updatedNotification = {
    ...existingNotification,
    ...updates,
    id: existingNotification.id,
    createdAt: existingNotification.createdAt,
    updatedAt: new Date().toISOString(),
  };

  await run(
    `UPDATE notifications
     SET title = ?, message = ?, audience = ?, status = ?, updatedAt = ?
     WHERE id = ?`,
    [
      updatedNotification.title,
      updatedNotification.message,
      updatedNotification.audience,
      updatedNotification.status,
      updatedNotification.updatedAt,
      id,
    ]
  );

  return getNotificationById(id);
}

export async function deleteNotification(id) {
  const existingNotification = await getNotificationById(id);

  if (!existingNotification) {
    return null;
  }

  await run("DELETE FROM notifications WHERE id = ?", [id]);
  return existingNotification;
}
