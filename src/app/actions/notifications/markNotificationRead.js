"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Notification from "@/models/Notification";

export async function markNotificationRead(notificationId) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in",
      };
    }

    await connectDB();

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return {
        success: false,
        message: "Notification not found",
      };
    }

    if (notification.recipient.toString() !== user._id.toString()) {
      return {
        success: false,
        message: "You cannot update this notification",
      };
    }

    notification.isRead = true;

    await notification.save();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Mark notification read error:", error);

    return {
      success: false,
      message: "Failed to update notification",
    };
  }
}
