"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Notification from "@/models/Notification";

export async function getNotifications() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [];
    }

    await connectDB();

    const notifications = await Notification.find({
      recipient: user._id,
    })
      .populate("sender", "name username profilePic")
      .populate("tweet", "text")
      .sort({
        createdAt: -1,
      });

    return JSON.parse(JSON.stringify(notifications));
  } catch (error) {
    console.error("Get notifications error:", error);

    return [];
  }
}

export async function getUnreadNotificationCount() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return 0;
    }

    await connectDB();

    return await Notification.countDocuments({
      recipient: user._id,
      isRead: false,
    });
  } catch (error) {
    console.error("Get unread notification count error:", error);

    return 0;
  }
}
