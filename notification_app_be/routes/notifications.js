import express from "express";
import {
  createNotification,
  deleteNotification,
  getAllNotifications,
  getNotificationById,
  seedNotifications,
  updateNotification,
} from "../repositories/notificationRepository.js";

const router = express.Router();

const seedData = [
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

export async function initializeNotificationSeed() {
  await seedNotifications(seedData);
}

router.get("/notifications", async (req, res, next) => {
  try {
    const notifications = await getAllNotifications();

    return res.status(200).json({
      status: "success",
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/notifications/:id", async (req, res, next) => {
  try {
    const notification = await getNotificationById(req.params.id);

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
  } catch (error) {
    next(error);
  }
});

router.post("/notifications", async (req, res, next) => {
  const { title, message, audience = "students", status = "draft" } = req.body;

  if (!title || !message) {
    return res.status(400).json({
      status: "error",
      message: "title and message are required",
    });
  }

  try {
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

    const createdNotification = await createNotification(notification);

    return res.status(201).json({
      status: "success",
      message: "Notification created successfully",
      data: createdNotification,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/notifications/:id", async (req, res, next) => {
  try {
    const updatedNotification = await updateNotification(req.params.id, req.body);

    if (!updatedNotification) {
      return res.status(404).json({
        status: "error",
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Notification updated successfully",
      data: updatedNotification,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/notifications/:id", async (req, res, next) => {
  try {
    const deletedNotification = await deleteNotification(req.params.id);

    if (!deletedNotification) {
      return res.status(404).json({
        status: "error",
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Notification deleted successfully",
      data: deletedNotification,
    });
  } catch (error) {
    next(error);
  }
});

export default router;