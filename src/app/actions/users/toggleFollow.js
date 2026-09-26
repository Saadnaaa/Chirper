"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import User from "@/models/User";

export async function toggleFollow(userId) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in",
        status: 401,
      };
    }

    if (currentUser._id.toString() === userId) {
      return {
        success: false,
        message: "You cannot follow yourself",
        status: 400,
      };
    }

    await connectDB();

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }

    const currentUserId = currentUser._id.toString();

    const alreadyFollowing = currentUser.following.some(
      (id) => id.toString() === userId,
    );

    if (alreadyFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userId,
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
