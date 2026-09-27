"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import User from "@/models/User";
import Notification from "@/models/Notification";

export async function toggleFollow(userId) {
  try {
    const authenticatedUser = await getCurrentUser();

    if (!authenticatedUser) {
      return {
        success: false,
        message: "You must be logged in",
      };
    }

    if (authenticatedUser._id.toString() === userId) {
      return {
        success: false,
        message: "You cannot follow yourself",
      };
    }

    await connectDB();

    const currentUser = await User.findById(authenticatedUser._id);
    const targetUser = await User.findById(userId);

    if (!currentUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (!targetUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const currentUserId = currentUser._id.toString();
    const targetUserId = targetUser._id.toString();

    const alreadyFollowing = currentUser.following.some(
      (id) => id.toString() === targetUserId,
    );

    if (alreadyFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId,
      );

      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId,
      );
    } else {
      currentUser.following.push(targetUser._id);

      targetUser.followers.push(currentUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    if (!alreadyFollowing) {
      await Notification.create({
        recipient: targetUser._id,
        sender: currentUser._id,
        type: "follow",
      });
    }

    return {
      success: true,
      following: !alreadyFollowing,
      followersCount: targetUser.followers.length,
    };
  } catch (error) {
    console.error("Toggle follow error:", error);

    return {
      success: false,
      message: "Failed to update follow",
    };
  }
}
