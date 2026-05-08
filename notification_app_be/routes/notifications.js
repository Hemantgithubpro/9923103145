import express from "express";

const router = express.Router();

const notifications = [
  {
    id: "1",
    title: "A New Tomorrow",
    message: "Some New Messages.",
    audience: "students",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function createNotificationId() {
  return String(Date.now());
}

router.get("/notifications", (req, res) => {
  res.status(200).json({
    status: "success",
    count: notifications.length,
    data: notifications,
  });
});

router.get("/notifications/:id", (req, res) => {
  const notification = notifications.find((item) => item.id === req.params.id);

  if (!notification) {
    return res.status(404).json({
      status: "error",
      message: "Notification not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: notification,
  });
});

router.post("/notifications", (req, res) => {
  const { title, message, audience = "students", status = "draft" } = req.body;

  if (!title || !message) {
    return res.status(400).json({
      status: "error",
      message: "title and message are required",
    });
  }

  const now = new Date().toISOString();
  const notification = {
    id: createNotificationId(),
    title,
    message,
    audience,
    status,
    createdAt: now,
    updatedAt: now,
  };

  notifications.unshift(notification);

  return res.status(201).json({
    status: "success",
    message: "Notification created successfully",
    data: notification,
  });
});

router.put("/notifications/:id", (req, res) => {
  const notificationIndex = notifications.findIndex((item) => item.id === req.params.id);

  if (notificationIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Notification not found",
    });
  }

  const existing = notifications[notificationIndex];
  const updatedNotification = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  notifications[notificationIndex] = updatedNotification;

  return res.status(200).json({
    status: "success",
    message: "Notification updated successfully",
    data: updatedNotification,
  });
});

router.delete("/notifications/:id", (req, res) => {
  const notificationIndex = notifications.findIndex((item) => item.id === req.params.id);

  if (notificationIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Notification not found",
    });
  }

  const deletedNotification = notifications.splice(notificationIndex, 1)[0];

  return res.status(200).json({
    status: "success",
    message: "Notification deleted successfully",
    data: deletedNotification,
  });
});

export default router;